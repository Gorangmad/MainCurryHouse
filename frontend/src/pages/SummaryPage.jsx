// SummaryPage.jsx
import React, { useState, useEffect } from 'react';
import { getApiUrl } from '../config/api';

import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FaShoppingCart } from "react-icons/fa";

const round2 = n => Math.round((n + Number.EPSILON) * 100) / 100;

const SummaryPage = ({ subtotal: subtotalProp = 0, deliveryCost = 0, totalAmount: totalAmountProp }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({});
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(subtotalProp);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // load display data
    const data = JSON.parse(localStorage.getItem("checkoutFormData") || "{}");
    setFormData(data);
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);

    // if wrapper didn’t pass subtotal, compute it here as a fallback
    if (subtotalProp === 0) {
      const sub = savedCart.reduce(
        (sum, item) => sum + (item.price || item.unitPrice || 0) * (item.quantity || 1),
        0
      );
      setSubtotal(sub);
    } else {
      setSubtotal(subtotalProp);
    }
  }, [subtotalProp]);

  // Prefer the amount from the wrapper; otherwise compute from subtotal+deliveryCost
  const computedTotal = totalAmountProp != null ? Number(totalAmountProp) : round2(subtotal + deliveryCost);

  // Hilfsfunktion für Order-Mutation
  const submitOrder = async (paymentMethod) => {
    setLoading(true);
    setError("");
    try {
      const orderInput = {
        customerUsername: formData.name || "",
        companyName: formData.companyName || "",
        email: formData.email || "",
        address: `${formData.address || ''}, ${formData.postcode || ''}`,
        phoneNumber: formData.phoneNumber || "",
        notes: formData.notes || "",
        products: cart.map(item => ({
          productId: String(item.productId),
          quantity: item.quantity,
          name: item.name,
          unitPrice: item.unitPrice || item.price,
          selectedSize: item.selectedSize || null
        })),
        deliveryCost: deliveryCost,
        paymentMethod: paymentMethod,
        orderType: deliveryCost > 0 ? "DELIVERY" : "PICKUP"
      };
      const response = await fetch(getApiUrl('/graphql'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation CreateOrder($input: OrderInput!) {
              createOrder(input: $input) { id }
            }
          `,
          variables: { input: orderInput }
        })
      });
      const result = await response.json();
      if (result.errors) {
        const msg = result.errors[0]?.message || "Fehler beim Absenden der Bestellung. Bitte versuchen Sie es erneut.";
        setError("Fehler beim Absenden der Bestellung: " + msg);
        setLoading(false);
        return false;
      }
      localStorage.removeItem("cart");
      setSuccess("Bestellung erfolgreich abgeschlossen! Eine Bestätigung wurde per E-Mail versendet.");
      setTimeout(() => (window.location.href = "/success"), 2000);
      setLoading(false);
      return true;
    } catch (e) {
      setError("Fehler beim Absenden der Bestellung. Bitte versuchen Sie es erneut.");
      setLoading(false);
      return false;
    }
  };

  const handleStripePayment = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    setError("");
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required', // Damit return_url nicht benötigt wird
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    // Nur wenn der Status "succeeded" ist, Bestellung anlegen
    if (paymentIntent && paymentIntent.status === "succeeded") {
      await submitOrder("CARD");
    } else {
      setError("Zahlung nicht erfolgreich abgeschlossen.");
      setLoading(false);
    }
  };

  const placeCashOrder = async () => {
    await submitOrder("CASH");
  };

  return (
    <div className="container mt-4">
      <div className="p-4 bg-light border rounded mb-4 text-center">
        <h2 className="m-0">Main Curry House</h2>
      </div>

      <div className="row">
        <div className="col-md-5 mb-4">
          <div className="p-4 border rounded">
            <h5>Kundendaten</h5>
            <hr />
            <p><strong>Name:</strong><br />{formData.name}</p>
            <p><strong>Adresse:</strong><br />{formData.address}, {formData.postcode}</p>
            <p><strong>Email:</strong><br />{formData.email}</p>
          </div>
        </div>

        <div className="col-md-7 mb-4">
          <div className="p-4 border rounded">
            <h5><FaShoppingCart className="me-2" />Produkte</h5>
            <hr />
            {cart.map(item => (
              <div key={item.productId} className="d-flex justify-content-between border-bottom py-2">
                <div>
                  <strong>{item.name}</strong><br />
                  Menge: {item.quantity} × €{(item.unitPrice || item.price).toFixed(2)}
                </div>
                <div>
                  €{((item.unitPrice || item.price) * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="mt-3">
              <p>Zwischensumme: €{round2(subtotal).toFixed(2)}</p>
              <p>Lieferkosten: €{round2(deliveryCost).toFixed(2)}</p>
              <h5>Gesamt: €{round2(computedTotal).toFixed(2)}</h5>
            </div>

            <hr />
            <h6>Zahlungsart wählen:</h6>
            <div className="mb-3">
              <button
                className={`btn ${paymentMethod === "cash" ? "btn-dark" : "btn-outline-dark"} me-2`}
                onClick={() => setPaymentMethod("cash")}
              >
                Barzahlung
              </button>
              <button
                className={`btn ${paymentMethod === "card" ? "btn-dark" : "btn-outline-dark"}`}
                onClick={() => setPaymentMethod("card")}
              >
                Kartenzahlung
              </button>
            </div>

            {paymentMethod === "card" && (
              <>
                <div className="p-3 border rounded">
                  <PaymentElement />
                </div>
                <button
                  onClick={handleStripePayment}
                  disabled={loading}
                  className="btn btn-primary w-100 mt-3"
                >
                  {loading ? "Zahlung läuft..." : `Jetzt €${round2(computedTotal).toFixed(2)} bezahlen`}
                </button>
              </>
            )}

            {paymentMethod === "cash" && (
              <button className="btn btn-success w-100" onClick={placeCashOrder} disabled={loading}>
                Bestellung abschließen (Barzahlung)
              </button>
            )}

            {error && <p className="text-danger mt-3">{error}</p>}
            {success && <p className="text-success mt-3">{success}</p>}
          </div>
        </div>
      </div>

      <style>{`
        .logo-placeholder { width: 100px; height: 100px; background: #ddd; border-radius: 50%; margin: 0 auto; }
      `}</style>
    </div>
  );
};

export default SummaryPage;
