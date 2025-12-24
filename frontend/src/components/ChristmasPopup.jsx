import React, { useState, useEffect } from 'react';

const ChristmasPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Prüfe ob Popup bereits heute angezeigt wurde
    const today = new Date().toDateString();
    const lastShown = localStorage.getItem('christmasPopupShown');
    
    // Popup nur am 24.12.2025 anzeigen
    const now = new Date();
    const christmas = new Date(2025, 11, 24); // Dezember hat Index 11
    const christmasEnd = new Date(2025, 11, 25); // 25. Dezember

    if (now >= christmas && now < christmasEnd && lastShown !== today) {
      setShowPopup(true);
      localStorage.setItem('christmasPopupShown', today);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) {
    return null;
  }

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderTop: '8px solid #E53935' }}>
          <div className="modal-header" style={{ backgroundColor: '#FFF3E0', borderBottom: '2px solid #E53935' }}>
            <h5 className="modal-title" style={{ color: '#C62828', fontFamily: 'Playfair Display', fontSize: '2rem' }}>
              🎄 Frohe Weihnachten! 🎄
            </h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body text-center" style={{ backgroundColor: '#FFFDE7', padding: '3rem 2rem' }}>
            <p style={{ fontSize: '1.2rem', color: '#5D4037', marginBottom: '1.5rem' }}>
              Liebe Gäste,
            </p>
            <p style={{ fontSize: '1.1rem', color: '#6D4C41', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              wir wünschen Ihnen <strong>Frohe Weihnachten</strong> und einen <strong>guten Rutsch</strong> ins neue Jahr! 🥳
            </p>
            <p style={{ fontSize: "1rem", color: "#795548", marginBottom: "2rem" }}>
              Unser Restaurant ist am <strong>24.12.2025</strong> geschlossen.
            </p>
            <p style={{ fontSize: "1rem", color: "#795548", marginBottom: "1.5rem" }}>
              Ab dem <strong>25. Dezember</strong> sind wir wieder für Sie da!
            </p>
            <div style={{ marginTop: '2rem', fontSize: '3rem' }}>
              🎅 🎁 ⛄
            </div>
          </div>
          <div className="modal-footer" style={{ backgroundColor: '#FFF3E0', borderTop: '2px solid #E53935' }}>
            <button type="button" className="btn" style={{ backgroundColor: '#A1887F', color: 'white' }} onClick={handleClose}>
              Schließen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChristmasPopup;
