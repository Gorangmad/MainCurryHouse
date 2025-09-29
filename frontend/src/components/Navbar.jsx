import React, { useState, useEffect } from "react";
import { FaShoppingBag } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import CartSidebar from "./CartSidebar";
import logo from "../img/logoW.png"; // dein Logo

const OnlineOrdering = () => {
  const [navbarBg, setNavbarBg] = useState("transparent");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [navOpen, setNavOpen] = useState(false); // NEW: controls burger/collapse

  // Close mobile nav when route changes or on wider screens
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 992) setNavOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarBg(window.scrollY > 50 ? "#4E342E" : "transparent");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRemoveItem = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.productId !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Helper: close the mobile menu after clicking a link
  const closeNavOnClick = () => setNavOpen(false);

  return (
    <>
      <style>{`
      .main-logo {
  max-height: 80px;
  width: auto;
  object-fit: contain;
}

/* ---------- Mobile Styles (<= 991px) ---------- */
@media (max-width: 991px) {
  .main-logo {
    max-height: 60px;
  }

  .navbar {
    background-color: #4e342e !important;
    padding: 1rem;
  }

  /* NAV COLLAPSE: von links einfahrend */
  .navbar-collapse {
    position: fixed;
    top: 0;
    left: -100%;             /* Start: komplett aus dem Bild links */
    width: 70%;
    height: 100vh;
    background-color: #4e342e;
    padding: 2rem 1.5rem;
    border-radius: 0 8px 8px 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: left 0.3s ease-in-out;
    z-index: 999;
  }

  /* wenn geöffnet */
  .navbar-collapse.show {
    left: 0;
  }

  .order-btn {
    width: 100%;
    margin-bottom: 1rem;
  }

  .navbar-nav {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .navbar-nav .nav-link {
    text-align: left;
    color: white !important;
    font-size: 1.2rem;
  }

  .navbar-toggler {
    border: none;
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 1000; /* über Menü */
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255,1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
    width: 1.8em;
    height: 1.8em;
  }

  .mobile-toggle-cart {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
}



      `}</style>

      <nav
        className="navbar navbar-expand-lg fixed-top px-4"
        style={{ backgroundColor: navbarBg, transition: "background-color 0.3s ease-in-out" }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center position-relative">
          {/* Left side: toggler + links */}
          <div className="d-flex align-items-center">
            <button
              className="navbar-toggler navbar-dark text-white border-0 me-2"
              type="button"
              aria-controls="navbarContent"
              aria-expanded={navOpen}
              aria-label="Toggle navigation"
              onClick={() => setNavOpen((s) => !s)}           // CHANGED
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              id="navbarContent"
              className={`collapse navbar-collapse ${navOpen ? "show" : ""}`}  // CHANGED
            >
              <ul className="navbar-nav mb-2 mb-lg-0 d-flex gap-lg-3">
                <li className="nav-item">
                  <a className="nav-link text-white" href="/menu" onClick={closeNavOnClick}>
                    Menu
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/order" onClick={closeNavOnClick}>
                    Order Online
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#reservations" onClick={closeNavOnClick}>
                    Reservations
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#about" onClick={closeNavOnClick}>
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#contact" onClick={closeNavOnClick}>
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Center logo */}
          <a className="navbar-brand position-absolute start-50 translate-middle-x text-center" href="/">
            <img src={logo} alt="Logo" className="main-logo d-block mx-auto" />
          </a>

          {/* Right side: Order + Cart */}
          <div className="d-flex align-items-center">
            <a href="/order" className="btn order-btn me-3" onClick={closeNavOnClick}>
              Order Now
            </a>
            <FaShoppingBag
              className="text-white fs-4"
              style={{ cursor: "pointer" }}
              onClick={() => setCartOpen((prev) => !prev)}
            />
          </div>
        </div>
      </nav>

      <CartSidebar
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cart={cart}
        handleQuantityChange={handleQuantityChange}
        handleRemoveItem={handleRemoveItem}
      />
    </>
  );
};

export default OnlineOrdering;
