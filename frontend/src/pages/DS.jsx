import React from 'react';

const Datenschutzerklaerung = () => (
  <div>
    <h2>Datenschutzerklärung</h2>

    <h3>Verantwortliche Stelle</h3>
    <p>
      Mein Curry House<br />
      Inhaber: <strong>Bharat Bhoshan</strong><br />
      Mainwasenweg 32<br />
      60599 Frankfurt am Main<br />
      E-Mail: <a href="mailto:info@meincurryhouse.de">info@meincurryhouse.de</a>
    </p>

    <h3>1. Erhebung personenbezogener Daten</h3>
    <p>
      Beim Bestellvorgang werden Name, Adresse, Telefonnummer, E-Mail, Bestellinhalt und Zahlungsinformationen erhoben.
      Diese Daten sind erforderlich, um Bestellungen auszuführen und abzurechnen.
    </p>

    <h3>2. Rechtsgrundlage der Verarbeitung</h3>
    <p>
      Die Verarbeitung erfolgt nach Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DSGVO (Erfüllung eines Vertrags) und
      Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO (berechtigtes Interesse an einem effizienten Betrieb der Webseite).
    </p>

    <h3>3. Weitergabe von Daten</h3>
    <p>Daten werden nur weitergegeben an:</p>
    <ul>
      <li>Stripe Payments Europe Ltd. (Irland) zur Abwicklung von Kartenzahlungen,</li>
      <li>Lieferpersonal (Name, Adresse, Telefonnummer, Bestellinhalt).</li>
    </ul>
    <p>Eine weitergehende Übermittlung an Dritte erfolgt nicht.</p>

    <h3>4. Cookies</h3>
    <p>
      Unsere Webseite verwendet ausschließlich technisch notwendige Cookies, um den Bestellprozess zu ermöglichen.
      Es findet kein Tracking und keine Reichweitenanalyse statt (kein Google Analytics, kein Facebook Pixel).
    </p>

    <h3>5. Server-Logs</h3>
    <p>
      Beim Aufruf der Webseite werden automatisch Daten (IP-Adresse, Browsertyp, Uhrzeit, Betriebssystem) protokolliert.
      Diese Daten dienen ausschließlich der technischen Sicherheit und werden nach 7&nbsp;Tagen gelöscht.
    </p>

    <h3>6. Kontaktformular</h3>
    <p>
      Wenn Sie uns über das Kontaktformular kontaktieren, speichern wir die Angaben (Name, E-Mail, Telefonnummer)
      ausschließlich zur Bearbeitung Ihrer Anfrage.
    </p>

    <h3>7. Speicherdauer</h3>
    <p>
      Daten werden gelöscht, sobald sie für die genannten Zwecke nicht mehr erforderlich sind oder gesetzliche
      Aufbewahrungsfristen ablaufen.
    </p>

    <h3>8. Rechte der Betroffenen</h3>
    <p>Sie haben jederzeit das Recht auf:</p>
    <ul>
      <li>Auskunft (Art.&nbsp;15 DSGVO),</li>
      <li>Berichtigung (Art.&nbsp;16 DSGVO),</li>
      <li>Löschung (Art.&nbsp;17 DSGVO),</li>
      <li>Einschränkung der Verarbeitung (Art.&nbsp;18 DSGVO),</li>
      <li>Datenübertragbarkeit (Art.&nbsp;20 DSGVO),</li>
      <li>Widerspruch (Art.&nbsp;21 DSGVO).</li>
    </ul>
    <p>
      Anfragen dazu bitte an: <a href="mailto:info@meincurryhouse.de">info@meincurryhouse.de</a>
    </p>

    <h3>9. Datensicherheit</h3>
    <p>
      Wir setzen SSL-Verschlüsselung ein, um die Datenübertragung zu schützen.
    </p>

    <h3>10. Beschwerderecht</h3>
    <p>
      Bei Datenschutzverstößen steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu:
      Der Hessische Beauftragte für Datenschutz und Informationsfreiheit (HBDI), Wiesbaden&nbsp;
      (<a href="https://datenschutz.hessen.de" target="_blank" rel="noopener noreferrer">datenschutz.hessen.de</a>).
    </p>
  </div>
);

export default Datenschutzerklaerung;
