import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import logo from '../img/logo.png'; // Dein Firmenlogo

// import logo from './logo.png'; // Falls du ein Logo hast

const CartSidebar = ({ cartOpen, setCartOpen }) => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(updatedCart);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(updatedCart);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRemoveItem = (productId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.productId !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );

  return (
    <>
      <div className={`cart-sidebar ${cartOpen ? "open" : ""}`}>
        {/* Kopfzeile */}
        <div className="cart-header">
          <h4>Dein Warenkorb</h4>
          <button className="close-btn" onClick={() => setCartOpen(false)}>×</button>
        </div>

        {/* Logo und Firmenname */}
        <div className="text-center mb-4">
          <div className="logo-placeholder">
            <img src={logo} alt="Firmenlogo" className="img-fluid" style={{ maxWidth: "90px", height: "auto" }} />
          </div>
          <h5 className="mt-2">Main Curry House</h5>
        </div>

        {cart.length === 0 ? (
          <p className="text-center">Dein Warenkorb ist leer.</p>
        ) : (
          <div>
            <div className="cart-items">
              {cart.map(item => (
                <div
                  key={item.productId}
                  className="cart-item d-flex justify-content-between align-items-start"
                >
                  <div className="item-details">
                    <h6 className="mb-1">{item.name}</h6>
                    <div className="d-flex align-items-center mb-1">
                      <label htmlFor={`quantity-${item.productId}`} className="me-2 small">
                        Menge:
                      </label>
                      <input
                        type="number"
                        id={`quantity-${item.productId}`}
                        className="form-control form-control-sm"
                        style={{ width: "70px" }}
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          handleQuantityChange(item.productId, parseInt(e.target.value) || 1)
                        }
                      />
                    </div>
                    <p className="mb-0 fw-bold">
                      Gesamt: {(item.unitPrice * item.quantity).toFixed(2)}{" "}
                      {item.currency || "EUR"}
                    </p>
                  </div>
                  <button
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => handleRemoveItem(item.productId)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <h5 className="mt-4 text-end">
              Gesamt: {totalAmount.toFixed(2)} {cart[0]?.currency || "EUR"}
            </h5>

            <button
              className="btn btn-primary w-100 mt-3"
              onClick={() => navigate("/details")}
            >
              Bestellübersicht
            </button>
          </div>
        )}
      </div>

      <style>{`
        .cart-sidebar {
          position: fixed;
          top: 0;
          right: -400px;
          width: 350px;
          height: 100%;
          background: #fff;
          box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
          transition: right 0.3s ease-in-out;
          overflow-y: auto;
          padding: 20px;
          z-index: 1000;
        }
        .cart-sidebar.open {
          right: 0;
        }
        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #ddd;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .logo-placeholder {
          width: 100px;
          height: 100px;
          background: #eee;
          border-radius: 50%;
          margin: 0 auto;
        }
        .cart-item {
          padding: 10px 0;
          border-bottom: 1px solid #ddd;
        }
        .cart-item:last-child {
          border-bottom: none;
        }
        .item-details {
          flex-grow: 1;
        }
      `}</style>
    </>
  );
};

export default CartSidebar;
