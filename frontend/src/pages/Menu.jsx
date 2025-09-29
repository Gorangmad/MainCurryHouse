import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import Navbar from "../components/Navbar";

let menuImage = require("../Home.jpg");

const MenuPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Produkte von der API abrufen
  useEffect(() => {
    fetch("http://localhost:3000/products-data")
    .then((response) => {
        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Speisekarte");
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

  // Produkte nach Kategorien gruppieren
  const categorizeProducts = (start, end) =>
    products.filter((product) => product.productId >= start && product.productId <= end);

  return (
    <>
      <Navbar />

      {/* Menü-Abschnitt */}
      <section className="container-fluid d-flex align-items-start justify-content-center py-5" style={{ backgroundColor: "#4E342E", overflow: "hidden" }}>
        <div className="row d-flex align-items-start">
          
          {/* Bild-Bereich */}
          <div className="col-lg-6 p-0 mt-3" style={{ maxHeight: "100vh", overflow: "hidden" }}>
            <img src={menuImage} alt="Menu" className="img-fluid w-100" style={{ objectFit: "cover", height: "100vh" }} />
          </div>

          {/* Menü-Anzeige mit Scroll-Funktion */}
          <div className="col-lg-6 d-flex flex-column px-5 text-white" style={{ maxHeight: "100vh", overflowY: "auto", paddingTop: "2rem", scrollbarWidth: "none" }}>
            <h2 className="fw-bold text-uppercase" style={{ fontSize: "4rem" }}>MENU</h2>
            <p className="fs-5">Served daily using local ingredients.<br/>All menu items are subject to change according to seasonality and availability.</p>

            {/* Fehler- oder Ladeanzeige */}
            {loading ? (
              <p className="text-center text-white mt-5">Lade Speisekarte...</p>
            ) : error ? (
              <p className="text-center text-danger mt-5">Fehler: {error}</p>
            ) : (
              [
                { category: "Starters & Sides", range: [1, 5] },
                { category: "Salads", range: [6, 12] },
                { category: "Pizza", range: [13, 19] },
                { category: "Pasta", range: [20, 23] },
                { category: "Burgers", range: [24, 26] },
                { category: "Desserts", range: [27, 29] },
              ].map(({ category, range }) => {
                const categoryProducts = categorizeProducts(range[0], range[1]);
                if (categoryProducts.length === 0) return null;

                return (
                  <div key={category} className="mb-4">
                    <h3 className="mt-4 text-uppercase fw-bold">{category}</h3>
                    <ul className="list-unstyled mt-3">
                      {categoryProducts.map((product) => (
                        <li key={product.productId} className="py-3 d-flex justify-content-between">
                          <div>
                            <span className="fw-light text-white" style={{ fontSize: "2rem" }}>{product.name}</span>
                            {product.description && <p className="text-white mb-0">{product.description}</p>}
                          </div>  
                          <span className="fs-4 text-white">
                            {product.unitPrice 
                              ? `€${product.unitPrice.toFixed(2)}` 
                              : Object.entries(product.unitPrices).map(([size, price]) => (
                                  <span key={size} className="d-block">{size}: €{price.toFixed(2)}</span>
                                ))
                            }
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MenuPage;
