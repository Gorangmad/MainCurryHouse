package com.backend.graphql.resolver;

import com.backend.email.MailService;
import com.backend.model.ContactInput;
import com.backend.model.RequestType;
import com.backend.service.ReCaptchaService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Map;
import java.util.HashMap;

@Controller
public class ContactResolver {
    private static final Logger logger = LoggerFactory.getLogger(ContactResolver.class);
    private final MailService mailService;
    private final ReCaptchaService reCaptchaService;

    public ContactResolver(MailService mailService, ReCaptchaService reCaptchaService) {
        this.mailService = mailService;
        this.reCaptchaService = reCaptchaService;
    }

    @MutationMapping
    public Map<String, Object> sendContactForm(@Argument ContactInput input) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Validate reCAPTCHA
            if (!reCaptchaService.validateCaptcha(input.getCaptchaToken())) {
                response.put("success", false);
                response.put("message", "reCAPTCHA Validierung fehlgeschlagen. Bitte versuchen Sie es erneut.");
                return response;
            }
            // Baue E-Mail-Inhalt basierend auf dem Anfragetyp
            String subject;
            StringBuilder emailContent = new StringBuilder();
            
            if (input.getRequestType() == RequestType.RESERVATION) {
                subject = "Neue Tischreservierung von " + input.getName();
                emailContent.append("<h2>Neue Tischreservierung</h2>");
                emailContent.append("<p><strong>Name:</strong> ").append(input.getName()).append("</p>");
                emailContent.append("<p><strong>E-Mail:</strong> ").append(input.getEmail()).append("</p>");
                emailContent.append("<p><strong>Telefon:</strong> ").append(input.getPhone()).append("</p>");
                emailContent.append("<p><strong>Datum:</strong> ").append(input.getDate()).append("</p>");
                emailContent.append("<p><strong>Uhrzeit:</strong> ").append(input.getTime()).append("</p>");
                emailContent.append("<p><strong>Anzahl der Personen:</strong> ").append(input.getGuests()).append("</p>");
            } else {
                subject = "Neue Anfrage: " + input.getSubject();
                emailContent.append("<h2>Neue Kontaktanfrage</h2>");
                emailContent.append("<p><strong>Name:</strong> ").append(input.getName()).append("</p>");
                emailContent.append("<p><strong>E-Mail:</strong> ").append(input.getEmail()).append("</p>");
                emailContent.append("<p><strong>Telefon:</strong> ").append(input.getPhone()).append("</p>");
                emailContent.append("<p><strong>Betreff:</strong> ").append(input.getSubject()).append("</p>");
                emailContent.append("<p><strong>Nachricht:</strong></p>");
                emailContent.append("<p>").append(input.getMessage()).append("</p>");
            }

            // Sende E-Mail an Restaurant
            mailService.sendEmail("info@maincurryhouse.com", subject, emailContent.toString());

            // Sende Bestätigungs-E-Mail an Kunden
            String confirmationSubject = input.getRequestType() == RequestType.RESERVATION ? 
                "Ihre Reservierungsanfrage" : "Ihre Kontaktanfrage";
            
            StringBuilder confirmationContent = new StringBuilder();
            confirmationContent.append("<h2>Vielen Dank für Ihre Anfrage</h2>");
            confirmationContent.append("<p>Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden.</p>");
            
            if (input.getRequestType() == RequestType.RESERVATION) {
                confirmationContent.append("<h3>Ihre Reservierungsdetails:</h3>");
                confirmationContent.append("<p>Datum: ").append(input.getDate()).append("</p>");
                confirmationContent.append("<p>Uhrzeit: ").append(input.getTime()).append("</p>");
                confirmationContent.append("<p>Anzahl der Personen: ").append(input.getGuests()).append("</p>");
            }
            
            confirmationContent.append("<p>Mit freundlichen Grüßen,<br>Ihr Main Curry House Team</p>");
            
            mailService.sendEmail(input.getEmail(), confirmationSubject, confirmationContent.toString());

            response.put("success", true);
            response.put("message", "Ihre Nachricht wurde erfolgreich gesendet.");
            
        } catch (Exception e) {
            logger.error("Fehler beim Senden des Kontaktformulars", e);
            response.put("success", false);
            response.put("message", "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.");
        }
        
        return response;
    }
}