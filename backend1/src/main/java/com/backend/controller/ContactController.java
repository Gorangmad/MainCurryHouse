package com.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.backend.service.ReCaptchaService;

@RestController
@RequestMapping("/api")
public class ContactController {

    private final ReCaptchaService recaptchaService;

    @Autowired
    public ContactController(ReCaptchaService recaptchaService) {
        this.recaptchaService = recaptchaService;
    }

    @PostMapping("/contact")
    public ResponseEntity<?> submitContactForm(@RequestBody ContactRequest request) {
        // Verify reCAPTCHA first
        if (!recaptchaService.verifyRecaptcha(request.getRecaptchaToken())) {
            return ResponseEntity.badRequest().body("reCAPTCHA verification failed");
        }

        // Process the contact form submission
        // Add your email sending logic here
        
        return ResponseEntity.ok().body("Message sent successfully");
    }

    public static class ContactRequest {
        private String name;
        private String email;
        private String message;
        private String recaptchaToken;

        // Getters and setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        
        public String getRecaptchaToken() { return recaptchaToken; }
        public void setRecaptchaToken(String recaptchaToken) { this.recaptchaToken = recaptchaToken; }
    }
}