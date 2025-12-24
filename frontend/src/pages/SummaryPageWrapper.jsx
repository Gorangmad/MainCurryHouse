// SummaryPageWrapper.jsx
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { getApiUrl } from '../config/api';
import { stripePromise } from "../App";
import SummaryPage from "./SummaryPage";

// ---------------- CONFIG BY POSTCODE ----------------
const ZONES = [
  { label: "Ostend",        min: 15, fee: 1.00, codes: ["60314","60316","60385"] },
  { label: "Sachsenhausen", min: 15, fee: 1.50, codes: ["60594","60596","60598"] },
  { label: "Offenbach",     min: 20, fee: 2.00, ranges: ["63065-63075"] },
  { label: "West-/Nordend", min: 25, fee: 2.00, codes: ["60318","60320","60322","60323","60325"] },
  { label: "Galluswarte",   min: 28, fee: 2.50, codes: ["60326","60486"] },
  { label: "Niederrad",     min: 28, fee: 2.50, codes: ["60528"] },
  { label: "Oberrad",       min: 15, fee: 1.00, codes: ["60599"] },
];

const ABS_MIN = 15;
const STD_DELIVERY = 2.50;

// ---------------- HELPERS ----------------
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

const extractPostcode = (raw) => {
  const m = String(raw ?? "").match(/\b\d{5}\b/);
  return m ? m[0] : "";
};

const inRange = (code, rangeStr) => {
  const n = parseInt(code, 10);
  const [a, b] = rangeStr.split("-").map((s) => parseInt(s, 10));
  return Number.isFinite(n) && Number.isFinite(a) && Number.isFinite(b) && n >= a && n <= b;
};

const findZoneByPostcode = (postcode) => {
  if (!postcode) return null;
  for (const z of ZONES) {
    if (z.codes && z.codes.includes(postcode)) return z;
    if (z.ranges && z.ranges.some((r) => inRange(postcode, r))) return z;
  }
  return null;
};

const pricingFor = (postcode) => {
  const zone = findZoneByPostcode(postcode);
  const min = zone?.min ?? ABS_MIN;
  const fee = zone?.fee ?? STD_DELIVERY;
  const delivery = fee; // Lieferkosten immer berechnet (bei Lieferung)
  return { delivery: round2(delivery), min, zoneLabel: zone?.label ?? "DEFAULT", inZone: !!zone };
};

// ---------------- COMPONENT ----------------
export default function SummaryPageWrapper() {
  const [clientSecret, setClientSecret] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    (async () => {
      const data = JSON.parse(localStorage.getItem("checkoutFormData") || "{}");
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");

      // Prüfe auf Weihnachtsfeirtag (24.12.2025)
      const now = new Date();
      const christmasStart = new Date(2025, 11, 24); // 24. Dezember 2025
      const christmasEnd = new Date(2025, 11, 25); // 25. Dezember 2025
      
      if (now >= christmasStart && now < christmasEnd) {
        setValidationError("🎄 Unser Restaurant ist am 24.12.2025 geschlossen. Ab dem 25. Dezember sind wir wieder für Sie da!");
        return;
      }

      // robustes Pickup-Flag (unterstützt mehrere mögliche Feldnamen)
      const isPickup =
        String(data?.fulfillment || data?.fulfilment || "")
          .toLowerCase()
          .includes("pickup") ||
        String(data?.deliveryMethod || "").toLowerCase() === "pickup" ||
        Boolean(data?.isPickup);

      const sub = savedCart.reduce(
        (sum, item) => sum + (item.price || item.unitPrice || 0) * (item.quantity || 1),
        0
      );
      setSubtotal(sub);

      let delivery = 0;

      if (isPickup) {
        // Bei Abholung keine Mindestbestellwert-Prüfung und keine Lieferkosten
        delivery = 0;
      } else {
        // Lieferung: PLZ-Prüfung und zonenbezogene Mindestbestellwerte
        const userPostcode = extractPostcode(data.postcode || "");
        if (!userPostcode) {
          setValidationError("Bitte geben Sie eine gültige Postleitzahl ein.");
          return;
        }
        const { delivery: d, min, inZone } = pricingFor(userPostcode);
        if (!inZone) {
          setValidationError("Leider liefern wir nicht in Ihre Region.");
          return;
        }
        if (sub < min) {
          setValidationError(`Der Mindestbestellwert für Ihre Region beträgt ${min} Euro.`);
          return;
        }
        delivery = d;
      }

      setDeliveryCost(delivery);
      const finalAmount = round2(sub + delivery);
      setTotalAmount(finalAmount);

      const response = await fetch(getApiUrl('/graphql'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation {
              createPayment(amount: ${finalAmount}, currency: "eur", paymentMethod: STRIPE) {
                clientSecret
              }
            }
          `,
        }),
      });

      const result = await response.json();
      setClientSecret(result?.data?.createPayment?.clientSecret || "");
    })();
  }, []);

  if (validationError) return <p className="text-danger">{validationError}</p>;
  if (!clientSecret) return <p>Lade Stripe …</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <SummaryPage
        subtotal={subtotal}
        deliveryCost={deliveryCost}
        totalAmount={totalAmount}
      />
    </Elements>
  );
}
