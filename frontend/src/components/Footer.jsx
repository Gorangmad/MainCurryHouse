import React from "react";
import "../index.css"

const Footer = () => {
  return (
    <footer className="container-fluid footer text-white py-5" style={{ backgroundColor: "#4E342E" }}>
      <div className="row text-center">
        <div className="col-12">
          <h1 className="fw-bold" id="footer-text" style={{ fontSize: "4rem", color: "#f8d7da"  }}>MAIN CURRY HOUSE</h1>
          <p className="fst-italic" style={{ fontSize: "1.5rem" }}>Catering &bull; Lieferservice &bull; Private Dining &bull; Events</p>
        </div>
      </div>
      <div className="row text-center mt-4">
        <div className="col-md-4">
          <p>MENU</p>
          <p>ORDER ONLINE</p>
          <p>RESERVATIONS</p>
          <p>ABOUT</p>
          <p>CONTACT</p>
        </div>
        <div className="col-md-4">
          <p className="fw-bold">Öffnungszeiten</p>
          <p>Montag bis Samstag: 16:00-22:00</p>
          <p>Sonntag und Feiertage: 12:00-22:00</p>
          <p>Dienstag Ruhetag</p>
        </div>
        <div className="col-md-4">
          <p className="fw-bold">Wo sie uns finden?</p>
          <p>Mainwasenweg 32, 60599 Frankfurt am Main</p>
          <p>069 651234</p>
          <p>info@maincurryhouse.de</p>
        </div>
      </div>
      <div className="row text-center mt-4">
        <div className="col-12">
          <p><a href="/Datenschutzerklaerung">Datenschutzerklaerung</a> &bull; <a href="/AGB">AGB</a> &bull; <a href="/Impressum">Impressum</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
