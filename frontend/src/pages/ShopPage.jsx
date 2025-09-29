import React, { useState, useEffect } from 'react';
import { getApiUrl } from '../config/api';

import drinksImg from '../img/Drinks.jpg';
import Butter from '../img/Butter.jpg';
import dip from '../img/dip.jpg';
import biryani from '../img/Biryani.jpg';
import hochzeiten from '../img/Hochzeiten.jpg';
import firmenfeier from '../img/Firmenfeier.jpg';
import Catering from '../img/Catering.jpg';
import Vorspeisen from '../img/Vorspeisen.jpg';
import aboutImage from '../img/Ambiente.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import sitarImage from '../img/Butter.jpg';
import chefImage from '../img/Catering.jpg';
import mittagImage from '../img/Mittagstisch.jpg';
import lunchImage from '../img/Drinks.jpg';
import EventImage from '../img/Events2.jpg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const HeroSection = () => {
    const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("vorspeisen");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
  AOS.init({ duration: 800, once: true });
  }, []);

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
        const uniqueCategories = [...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);
        if (uniqueCategories.length > 0) {
          setActiveTab(uniqueCategories[0]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);


  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');
        
          body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
          }
        
          .bg-column {
            height: 100%;
            overflow: hidden;
            position: relative;
            background: #000000;
            opacity: 0;
            transform: translateY(40px);
            animation: fadeInColumn 1.2s ease-out forwards;
          }
        
          .bg-column:nth-child(1) { animation-delay: 0s; }
          .bg-column:nth-child(2) { animation-delay: 0.2s; }
          .bg-column:nth-child(3) { animation-delay: 0.4s; }
          .bg-column:nth-child(4) { animation-delay: 0.6s; }
          .bg-column:nth-child(5) { animation-delay: 0.8s; }
        
          .bg-column img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.6;
          }
        
          .bg-column::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.15);
            z-index: 1;
          }
        
          .center-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 20;
            width: 100%;
            text-align: center;
            padding: 0 1rem;
          }
        
          .svg-title {
          font-family: "Italianno", cursive;
          font-size: 100px;
            fill: none;
            stroke: #ffffff;
            stroke-width: 4; /* More bold */
            stroke-dasharray: 1500;
            stroke-dashoffset: 1500;
            opacity: 0;
            animation: draw 6s ease forwards;
            animation-delay: 1.2s;
          }
        
          .hero-buttons {
            margin-top: 2.5rem;
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            flex-wrap: wrap;
            opacity: 0;
            animation: fadeInButtons 1s ease forwards;
            animation-delay: 2s;
          }
        
          .hero-button {
            background-color: #5e3c2d;
            color: white;
            padding: 1rem 2rem;
            font-size: 1.25rem;
            font-weight: 600;
            border: none;
            border-radius: 40px;
            cursor: pointer;
            transition: background 0.3s ease;
            text-decoration: none;
          }
        
          .hero-button:hover {
            background-color: #44291f;
          }
        
          @keyframes draw {
            to {
              stroke-dashoffset: 0;
              opacity: 1;
            }
          }
        
          @keyframes fadeInColumn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        
          @keyframes fadeInColumn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        
          @keyframes fadeInButtons {
            to {
              opacity: 1;
            }
          }
        
          @media (min-width: 768px) {
            .svg-title {
              font-size: 130px;
            }
        
            .hero-button {
              font-size: 1rem;
              padding: 1.2rem 2.5rem;
            }
          }
            @media (max-width: 767px) {
          .bg-column {
            height: 20vh; /* Limit each row height on small screens */
          }
        }
        
        @media (min-width: 768px) {
          .bg-column {
            height: 100vh; /* Full height columns on desktop */
          }
        }
        
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s ease-out;
        }
        
        .fade-up.show {
          opacity: 1;
          transform: translateY(0);
        }
        
        
        .fade-up-delay-1 { animation-delay: 0.2s; }
        .fade-up-delay-2 { animation-delay: 0.4s; }
        .fade-up-delay-3 { animation-delay: 0.6s; }
        .fade-up-delay-4 { animation-delay: 0.8s; }
        
        
        `}
    </style>

    <Navbar />

    {/* Hero */}
    <section className="position-relative w-100 vh-100 overflow-hidden">
        {/* 5 Bildspalten */}
        <div className="d-flex flex-column flex-md-row position-absolute top-0 start-0 w-100 h-100">
          <div className="bg-column col-md"> <img src={drinksImg} alt="Spalte 1" /> </div>
          <div className="bg-column col-md"> <img src={dip} alt="Spalte 2" /> </div>
          <div className="bg-column col-md"> <img src={Vorspeisen} alt="Spalte 3" /> </div>
          <div className="bg-column col-md"> <img src={Catering} alt="Spalte 4" /> </div>
          <div className="bg-column col-md"> <img src={Butter} alt="Spalte 5" /> </div>
        </div>



        {/* Zentrum Inhalt */}
        <div className="center-content">
          <svg width="100%" height="180px" viewBox="0 0 800 180" xmlns="http://www.w3.org/2000/svg">
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              dy="10"
              className="svg-title"
            >
              Main Curry House
            </text>
          </svg>
          {/* Buttons */}
          <div className="hero-buttons">
            <a href="#contact" className="hero-button">Tisch reservieren</a>
            <a href="/order" className="hero-button">Online bestellen</a>
          </div>
        </div>
    </section>

    {/* Unsere Spezialität */}
    <section className="py-5" style={{ backgroundColor: "#FDF8F3" }}>
      <div className="container px-4">
        <h2 className="text-center fw-bold mb-5" style={{ fontFamily: "Playfair Display", fontSize: "2rem" }}>
          Unsere Spezialitäten
        </h2>
        <div className="row g-4">
          {/* Dish 1 */}
          <div className="col-12 col-md-4" data-aos="fade-up">
            <div className="bg-white rounded shadow-sm h-100">
              <div className="d-flex align-items-center justify-content-center" style={{ height: "12rem", backgroundColor: "#A1887F" }}>
                <img src={Butter} alt="Butter Chicken" className="img-fluid h-100 w-100 object-fit-cover" />
              </div>
              <div className="p-4">
                <h3 className="fw-bold mb-2" style={{ fontFamily: "Playfair Display", fontSize: "1.25rem" }}>Butter Chicken</h3>
                <p className="text-muted mb-3" style={{ color: "#6D4C41" }}>
                  Zartes Hühnchen in einer cremigen Tomaten-Butter-Sauce mit aromatischen Gewürzen.
                </p>
                <p className="fw-bold" style={{ color: "#5D4037" }}>€16.90</p>
              </div>
            </div>
          </div>

          {/* Dish 2 */}
          <div className="col-12 col-md-4" data-aos="fade-up">
            <div className="bg-white rounded shadow-sm h-100">
              <div className="d-flex align-items-center justify-content-center" style={{ height: "12rem", backgroundColor: "#A1887F" }}>
                <img src={Vorspeisen} alt="Palak Paneer" className="img-fluid h-100 w-100 object-fit-cover" />
              </div>
              <div className="p-4">
                <h3 className="fw-bold mb-2" style={{ fontFamily: "Playfair Display", fontSize: "1.25rem" }}>Vorspeisenplatte</h3>
                <p className="text-muted mb-3" style={{ color: "#6D4C41" }}>
                  Eine Auswahl unserer besten Vorspeisen: Samosas, Pakoras und Papadam.
                </p>
                <p className="fw-bold" style={{ color: "#5D4037" }}>€13.90</p>
              </div>
            </div>
          </div>

          {/* Dish 3 */}
          <div className="col-12 col-md-4 " data-aos="fade-up" >
            <div className="bg-white rounded shadow-sm h-100">
              <div className="d-flex align-items-center justify-content-center" style={{ height: "12rem", backgroundColor: "#A1887F" }}>
                <img src={biryani} alt="Biryani" className="img-fluid h-100 w-100 object-fit-cover" />
              </div>
              <div className="p-4">
                <h3 className="fw-bold mb-2" style={{ fontFamily: "Playfair Display", fontSize: "1.25rem" }}>Biryani</h3>
                <p className="text-muted mb-3" style={{ color: "#6D4C41" }}>
                  Aromatischer Basmatireis mit Safran, Gewürzen und Ihrer Wahl von Huhn, Lamm oder Gemüse.
                </p>
                <p className="fw-bold" style={{ color: "#5D4037" }}>€17.90</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

          {/* Speisekarte */}
      <section className="py-5" style={{ backgroundColor: "#EFEBE9" }} id="menu">
        <div className="container px-4">
          <h2 className="text-center fw-bold mb-5" style={{ fontFamily: "Oswald", fontSize: "3rem" }}>
            Unsere Lieferkarte
          </h2>

          {loading && <p>Lade Daten...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <>
              <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`btn rounded-pill px-4 py-2 fw-medium ${activeTab === cat ? 'text-white bg-brown' : 'text-dark bg-light'}`}
                    style={{ backgroundColor: activeTab === cat ? '#8D6E63' : '#D7CCC8' }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="row g-4">
                {products.filter(item => item.category === activeTab).map((item, index) => (
                  <div className="col-12 col-md-6" key={index}>
                    <div className="bg-white rounded p-4 shadow-sm h-100">
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5 className="fw-bold mb-1">{item.name}</h5>
                          <p className="text-muted mb-0" style={{ color: "#6D4C41" }}>{item.description}</p>
                        </div>
                        <span className="fw-bold" style={{ color: "#5D4037" }}>€{item.unitPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>


     {/* About Section */}
      <section id="about" className="py-5 text-white" style={{ backgroundColor: "#8D6E63" }}>
        <div className="container px-4">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0" data-aos="zoom-in-right">
              <div className="rounded overflow-hidden shadow" style={{ transform: "rotate(-2deg)" }}>
                <img src={aboutImage} alt="Restaurant Innenraum" className="img-fluid w-100" />
              </div>
            </div>
            <div className="col-md-6" data-aos="fade-left" data-aos-delay="200">
              <h2 className="fw-bold mb-4" style={{ fontFamily: "Oswald", fontSize: "2rem" }}>Über Main Curry House</h2>
              <p className="mb-3">
                Willkommen im <strong>Main Curry House</strong> – Ihrem indischen Restaurant direkt am Mainufer in Frankfurt. Seit über 20 Jahren verwöhnen wir unsere Gäste mit authentischem indischen Essen, inspiriert von traditionellen Rezepten aus ganz Indien.
                Ob romantisches Abendessen, Familienbesuch oder exklusives <strong>Catering</strong> für <strong>Hochzeiten</strong>, <strong>Feiern</strong> und Firmenevents – wir bieten Ihnen ein unvergessliches Geschmackserlebnis mitten in Frankfurt.
              </p>
              <p className="mb-4">
                Unser familiengeführtes Restaurant steht für Qualität, Frische und Leidenschaft. Wir verwenden nur frische Zutaten, hochwertige Gewürze und bereiten jedes Gericht mit Hingabe zu. Feiern Sie mit uns besondere Momente und genießen Sie die Vielfalt der indischen Küche – ob im Restaurant oder als Catering bei Ihrer Veranstaltung.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge rounded-pill py-2 px-3" style={{ backgroundColor: "#F9C784", color: "#5D4037" }}>Catering in Frankfurt</span>
                <span className="badge rounded-pill py-2 px-3" style={{ backgroundColor: "#F9C784", color: "#5D4037" }}>Feiern & Events</span>
                <span className="badge rounded-pill py-2 px-3" style={{ backgroundColor: "#F9C784", color: "#5D4037" }}>Indische Spezialitäten</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" style={{ backgroundColor: "#FFF9F0" }}>
  <div className="container px-4">
    <h2 className="text-center fw-bold mb-5" style={{ fontFamily: "Playfair Display", fontSize: "2rem", color: "#5D4037" }}>
      Events & Angebote
    </h2>

    <div className="row g-4 mb-4">
      {/* Live Sitar Musik */}
      <div className="col-md-6">
        <div className="bg-white rounded shadow-sm h-100 overflow-hidden" style={{ borderTop: "6px solid #A1887F" }}>
          <img src={hochzeiten} alt="Sitar Musik" style={{ width: "100%", height: "320px", objectFit: "cover" , objectPosition: "center bottom" }} />
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="fw-bold mb-0">Hochzeiten und Geburtstage</h5>
              <span className="badge bg-warning text-dark">Feiern</span>
            </div>
            <p className="text-muted mb-2">
              Feiern Sie Ihre besonderen Anlässe in unserem stilvollen Ambiente mit indischen Köstlichkeiten und Musik.
            </p>
          </div>
        </div>
      </div>

      {/* Kochkurs */}
      <div className="col-md-6">
        <div className="bg-white rounded shadow-sm h-100 overflow-hidden" style={{ borderTop: "6px solid #A1887F" }}>
          <img src={firmenfeier} alt="Chefkoch" style={{ width: "100%", height: "320px", objectFit: "cover" }} />
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="fw-bold mb-0">Firmenfeiern</h5>
              <span className="badge bg-warning text-dark">Firmen</span>
            </div>
            <p className="text-muted mb-2">
              Bieten Sie Ihren Mitarbeitern ein unvergessliches Erlebnis mit indischem Essen und Live-Musik in unserem Restaurant.
            </p>
          </div>
        </div>
      </div>
    </div>

        <div className="row g-4 mb-4">
      {/* Live Sitar Musik */}
      <div className="col-md-6">
        <div className="bg-white rounded shadow-sm h-100 overflow-hidden" style={{ borderTop: "6px solid #A1887F" }}>
          <img src={EventImage} alt="Sitar Musik" style={{ width: "100%", height: "320px", objectFit: "cover"}} />
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="fw-bold mb-0">Events</h5>
              <span className="badge bg-warning text-dark">Speziel</span>
            </div>
            <p className="text-muted mb-2">
              Genießen Sie unsere Events mit Live-Musik und besonderen Angeboten.
            </p>
          </div>
        </div>
      </div>

      {/* Kochkurs */}
      <div className="col-md-6">
        <div className="bg-white rounded shadow-sm h-100 overflow-hidden" style={{ borderTop: "6px solid #A1887F" }}>
          <img src={mittagImage} alt="Chefkoch" style={{ width: "100%", height: "320px", objectFit: "cover" }} />
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="fw-bold mb-0">Mittagtisch</h5>
              <span className="badge bg-warning text-dark">Täglich</span>
            </div>
            <p className="text-muted mb-2">
              Genießen Sie unser täglich wechselndes Mittagsmenü mit indischen Spezialitäten zu einem günstigen Preis.
            </p>
            <p className="fw-bold mb-0" style={{ color: "#5D4037" }}>
              Montag bis Freitag: 11:30 - 14:30 Uhr
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>


{/* Google Bewertungen Section */}
<section id="google-reviews" className="py-5" style={{ backgroundColor: "#FBE9E7" }}>
  <div className="container px-4">
    <h2 className="text-center fw-bold mb-4" style={{ fontFamily: "Oswald", fontSize: "2.5rem", color: "#5D4037" }}>
      Das sagen unsere Gäste
    </h2>
    <p className="text-center mb-5" style={{ color: "#6D4C41", fontSize: "1.1rem" }}>
      Unsere Gäste lieben das Main Curry House – überzeugen Sie sich selbst von den Bewertungen auf Google!
    </p>

    {/* Widget Embed (Featurable) */}
    <div className="row justify-content-center">
      <div className="col-12 col-lg-10">
          {/* Call-to-action button */}
          <div className="container my-5">
            <div id="featurable-b3653877-e8d9-47b4-81f7-ec1b4d0bd83c" data-featurable-async ></div>
          </div>
      </div>
    </div>


  </div>
</section>

  {/* Kontakt Section */}
      <section id="contact" className="py-5" style={{ backgroundColor: "#EFEBE9" }}>
        <div className="container px-4">
          <h2 className="text-center fw-bold mb-4" style={{ fontFamily: "Oswald", fontSize: "2.5rem", color: "#5D4037" }}>
            Kontakt
          </h2>
          <p className="text-center mb-5" style={{ color: "#6D4C41", fontSize: "1.1rem" }}>
            Haben Sie Fragen, möchten Sie reservieren oder ein Event planen? Kontaktieren Sie uns – wir freuen uns auf Ihre Nachricht!
          </p>

          <div className="row">
            {/* Kontaktformular */}
            <div className="col-md-6 mb-4">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Ihr Name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">E-Mail</label>
                  <input type="email" className="form-control" id="email" placeholder="Ihre E-Mail-Adresse" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Nachricht</label>
                  <textarea className="form-control" id="message" rows="4" placeholder="Ihre Nachricht"></textarea>
                </div>
                <button type="submit" className="btn btn-dark px-4 py-2 rounded-pill">Absenden</button>
              </form>
            </div>

            {/* Kontaktinformationen */}
            <div className="col-md-6 mb-4">
              <div className="bg-white rounded shadow-sm p-4 h-100">
                <h5 className="fw-bold mb-3" style={{ color: "#5D4037" }}>Main Curry House</h5>
                <p className="mb-2"><strong>Adresse:</strong><br />Mainwasenweg 32, 60599 Frankfurt am Main</p>
                <p className="mb-2"><strong>Telefon:</strong><br /><a href="tel: 069651234">069 651234</a></p>
                <p className="mb-2"><strong>E-Mail:</strong><br /><a href="mailto:info@maincurryhouse.de">info@maincurryhouse.de</a></p>
                <p className="mb-0"><strong>Öffnungszeiten:</strong><br />Mo – Do: 11:30 – 14:30 Uhr <br />Mo – Do: 17:00 – 22:30 Uhr <br />Fr – So: 11:30 – 22:30 Uhr</p>
              </div>
            </div>
          </div>

          {/* Google Maps Karte */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="ratio ratio-16x9 rounded shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2558.990237463745!2d8.716756!3d50.105189700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd0f454331eca7%3A0x536a3a60a588e028!2sMain%20Curry%20House!5e0!3m2!1sen!2sde!4v1757859980160!5m2!1sen!2sde"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Main Curry House Standort"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>


<Footer />



    </>
  );
};

export default HeroSection;
