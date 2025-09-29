import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import orderImage from "../Home.jpg";
import { useNavigate } from "react-router-dom";

const DetailsPage = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    localStorage.setItem("checkoutFormData", JSON.stringify(formData));
    navigate("/summary");
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    postcode: '',
    etage: '',
    notes: '',
    deliveryOption: '', // NEU
  });

  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);

    const total = savedCart.reduce((sum, item) => {
      const itemPrice = item.price || item.unitPrice || 0;
      return sum + itemPrice * (item.quantity || 1);
    }, 0);
    setTotalAmount(total);

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setFormData((prev) => ({
          ...prev,
          name: decoded.sub || '',
          email: decoded.email || '',
          phoneNumber: decoded.phoneNumber || '',
          address: decoded.address || '',
        }));
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />

      <div className="full-width-image-container">
        <div className="overlay">
          <h1 className="overlay-text">ORDER DETAILS</h1>
        </div>
        <img src={orderImage} alt="Order" className="full-width-image" />
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <h3 className="mb-3">Kundendaten</h3>
            <form onSubmit={(e) => e.preventDefault()}>

              <div className="mb-3">
                <label className="form-label">Lieferoption</label>
                <select
                  name="deliveryOption"
                  className="form-select"
                  value={formData.deliveryOption}
                  onChange={handleChange}
                  required
                >
                  <option value="">Bitte wählen</option>
                  <option value="delivery">Lieferung</option>
                  <option value="pickup">Abholung</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {formData.deliveryOption === "delivery" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Adresse</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Postleitzahl</label>
                    <input
                      type="text"
                      name="postcode"
                      className="form-control"
                      value={formData.postcode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}

              <div className="mb-3">
                <label className="form-label">E-Mail</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Telefonnummer</label>
                <input
                  type="text"
                  name="phoneNumber"
                  className="form-control"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Notizen</label>
                <input
                  type="text"
                  name="notes"
                  className="form-control"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>

              <button
                onClick={handleNext}
                className="btn btn-dark w-100 mt-3"
              >
                Weiter zur Bestellübersicht
              </button>
            </form>
          </div>

          <div className="col-md-6">
            <h3 className="mb-3">Produkte im Warenkorb</h3>
            {cart.length === 0 ? (
              <p className="text-center text-danger">Dein Warenkorb ist leer.</p>
            ) : (
              <div className="cart-box-container">
                {cart.map((item) => (
                  <div key={item.productId} className="cart-item-box">
                    <h5>{item.name} {item.selectedSize ? `(${item.selectedSize})` : ""}</h5>
                    <p>Preis: €{(item.price || item.unitPrice).toFixed(2)}</p>
                    <p>Menge: {item.quantity}</p>
                  </div>
                ))}
                <h4 className="mt-3 text-end fw-bold">Gesamt: €{totalAmount.toFixed(2)}</h4>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .full-width-image-container {
          position: relative;
          width: 100%;
          height: 300px;
        }
        .full-width-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .overlay-text {
          color: white;
          font-size: 3rem;
        }
        .cart-item-box {
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 10px;
        }
      `}</style>
    </>
  );
};

export default DetailsPage;
