import React, { useState, useEffect } from 'react';
import { getApiUrl } from '../config/api';

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import Navbar from "../components/Navbar";
import { FaCheckCircle, FaTimesCircle, FaShoppingCart } from "react-icons/fa";

let orderingImage = require("../img/Mittagstisch.jpg");

const OnlineOrdering = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [addedToCart, setAddedToCart] = useState({});

  const today = new Date().getDay();
  
  // Prüfe auf Weihnachtsfeirtag (24.12.2025)
  const now = new Date();
  const christmasStart = new Date(2025, 11, 24); // 24. Dezember 2025
  const christmasEnd = new Date(2025, 11, 25); // 25. Dezember 2025
  const isChristmasDay = now >= christmasStart && now < christmasEnd;
  
  // Alte Öffnungszeiten-Prüfung (auskommentiert)
  /*
  const isOpen = (() => {
    const timeInMinutes = currentHour * 60 + currentMinutes;

    if (today === 0) {
      // Sonntag: 11:00–23:00
      const sundayStart = 11 * 60;
      const sundayEnd = 23 * 60;
      return timeInMinutes >= sundayStart && timeInMinutes <= sundayEnd;
    } else {
      // Mo–Sa: 11:00–14:30 und 17:00–23:00
      const lunchStart = 11 * 60;
      const lunchEnd = 14 * 60 + 30;
      const dinnerStart = 17 * 60;
      const dinnerEnd = 23 * 60;
      return (
        (timeInMinutes >= lunchStart && timeInMinutes <= lunchEnd) ||
        (timeInMinutes >= dinnerStart && timeInMinutes <= dinnerEnd)
      );
    }
  })();
  */

  // Neue Version: Immer geöffnet, außer am 24.12.
  const isOpen = !isChristmasDay;

  useEffect(() => {
    fetch(getApiUrl('/products-data'))
      .then((response) => {
        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Daten");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // helper
const readCart = () => JSON.parse(localStorage.getItem("cart") || "[]");

const addToCart = (product) => {
  if (!isOpen) {
    if (isChristmasDay) {
      alert("🎄 Unser Restaurant ist am 24.12.2025 geschlossen. Ab dem 25. Dezember sind wir wieder für Sie da!");
    } else {
      alert("Wir nehmen Bestellungen nur während der Öffnungszeiten entgegen.");
    }
    return;
  }

  // 🔑 use the latest cart as the base
  const baseCart = readCart();
  let nextCart = [...baseCart];

  if (product.unitPrices) {
    const selectedSize = selectedSizes[product.productId];
    if (!selectedSize) {
      alert("Bitte eine Größe auswählen!");
      return;
    }
    const price = product.unitPrices[selectedSize];

    const idx = nextCart.findIndex(
      (item) =>
        item.productId === product.productId &&
        item.selectedSize === selectedSize
    );

    if (idx !== -1) {
      nextCart[idx] = { ...nextCart[idx], quantity: nextCart[idx].quantity + 1 };
    } else {
      nextCart.push({ ...product, quantity: 1, selectedSize, price });
    }
  } else {
    const idx = nextCart.findIndex((item) => item.productId === product.productId);
    if (idx !== -1) {
      nextCart[idx] = { ...nextCart[idx], quantity: nextCart[idx].quantity + 1 };
    } else {
      nextCart.push({ ...product, quantity: 1, price: product.unitPrice });
    }
  }

  setCart(nextCart); // your useEffect persists it to localStorage

  // ✅ show checkmark
  setAddedToCart((prev) => ({ ...prev, [product.productId]: true }));
  setTimeout(() =>
    setAddedToCart((prev) => ({ ...prev, [product.productId]: false })), 2000
  );


    // ✅ Haken anzeigen
    setAddedToCart((prev) => ({
      ...prev,
      [product.productId]: true,
    }));

    setTimeout(() => {
      setAddedToCart((prev) => ({
        ...prev,
        [product.productId]: false,
      }));
    }, 2000);
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prevSizes) => ({ ...prevSizes, [productId]: size }));
  };

  const getProductsByCategory = (category) =>
    products.filter((product) => product.category === category);

  const uniqueCategories = [
    ...(today === 3 ? ["Angebote Schnitzel"] : []),
    ...(today === 4 ? ["Angebote Pizza"] : []),
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  return (
    <>
      <Navbar />
      <div
        className="position-relative"
        style={{ height: "50vh", overflow: "hidden" }}
      >
        <img
          src={orderingImage}
          alt="Ordering"
          className="img-fluid w-100"
          style={{ objectFit: "cover", height: "100%" }}
        />
      </div>

      <section className="container text-start py-5">
        <h1
          className="fw-bold"
          style={{ fontSize: "6rem", color: "#4E342E" }}
        >
          ONLINE ORDERING
        </h1>
        <p className="fs-5 text-dark">
          Bestelle jetzt online! Wähle aus unserer Speisekarte deine
          Lieblingsgerichte.
        </p>

        <div className="d-flex align-items-center mb-4">
          {isOpen ? (
            <span className="badge bg-light text-dark px-4 py-3">
              <FaCheckCircle className="me-2 text-success" /> Bestellungen
              möglich
            </span>
          ) : (
            <span className="badge bg-light text-dark px-4 py-3">
              <FaTimesCircle className="me-2 text-danger" /> 
              {isChristmasDay 
                ? "🎄 Restaurant am 24.12.2025 geschlossen – Ab dem 25. Dezember geöffnet" 
                : "Momentan geschlossen – bitte während der Öffnungszeiten bestellen"}
            </span>
          )}
        </div>
      </section>

      {loading ? (
        <div className="text-center my-5">
          <p className="text-muted">Lade Speisekarte...</p>
        </div>
      ) : error ? (
        <div className="text-center my-5">
          <p className="text-danger">Fehler: {error}</p>
        </div>
      ) : (
        <section className="container text-start py-5">
          <h1
            className="fw-bold mt-5"
            style={{ fontSize: "5rem", color: "#4E342E" }}
          >
            Speisekarte
          </h1>

          {uniqueCategories.map((category) => {
            const categoryProducts = getProductsByCategory(category);
            if (categoryProducts.length === 0) return null;

            return (
              <div key={category} className="mb-5">
                <h3 className="mt-4 text-uppercase fw-bold">{category}</h3>
                <div className="row mt-3">
                  {categoryProducts.map((product) => (
                    <div className="col-md-4 mb-4" key={product.productId}>
                      <div className="p-3 border rounded-3 shadow-sm">
                        <h5 className="fw-bold text-dark">{product.name}</h5>
                        {product.description && (
                          <p className="text-muted">{product.description}</p>
                        )}
                        <div className="d-flex flex-column">
                          {product.unitPrices ? (
                            <>
                              <select
                                className="form-select mb-2"
                                onChange={(e) =>
                                  handleSizeChange(
                                    product.productId,
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">Größe wählen</option>
                                {Object.entries(product.unitPrices).map(
                                  ([size, price]) => (
                                    <option key={size} value={size}>
                                      {size}: €{price.toFixed(2)}
                                    </option>
                                  )
                                )}
                              </select>
                              <button
                                className="btn btn-outline-success"
                                onClick={() => addToCart(product)}
                                disabled={!isOpen}
                              >
                                {addedToCart[product.productId] ? (
                                  <>
                                    <FaCheckCircle className="me-2" /> Hinzugefügt
                                  </>
                                ) : (
                                  <>
                                    <FaShoppingCart className="me-2" /> In den Warenkorb
                                  </>
                                )}
                              </button>
                            </>
                          ) : (
                            <>
                              <span className="fs-5 fw-bold text-dark">
                                €{product.unitPrice.toFixed(2)}
                              </span>
                              <button
                                className="btn btn-outline-success mt-2"
                                onClick={() => addToCart(product)}
                                disabled={!isOpen}
                              >
                                {addedToCart[product.productId] ? (
                                  <>
                                    <FaCheckCircle className="me-2" /> Hinzugefügt
                                  </>
                                ) : (
                                  <>
                                    <FaShoppingCart className="me-2" /> In den Warenkorb
                                  </>
                                )}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      )}
    </>
  );
};

export default OnlineOrdering;
