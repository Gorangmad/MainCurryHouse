package com.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ReCaptchaService {

    @Value("${google.recaptcha.secret}")
    private String recaptchaSecret;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    // Nutzt den Boot-Builder → kein eigener @Bean nötig
    public ReCaptchaService(RestTemplateBuilder builder, ObjectMapper objectMapper) {
        this.restTemplate = builder.build();
        this.objectMapper = objectMapper;
    }


    public boolean validateCaptcha(String captchaToken) {
        try {
            String url = "https://www.google.com/recaptcha/api/siteverify";

            MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
            form.add("secret", recaptchaSecret);
            form.add("response", captchaToken);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(form, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            JsonNode json = objectMapper.readTree(response.getBody());

            // v2: nur success; v3: success + ggf. score/action prüfen
            return json.path("success").asBoolean(false);
        } catch (Exception e) {
            // optional: Logger nutzen
            return false;
        }
    }

    public boolean verifyRecaptcha(String recaptchaToken) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'verifyRecaptcha'");
    }
}
