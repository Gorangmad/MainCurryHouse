package com.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")  // Gilt für alle Endpunkte
                        .allowedOrigins("http://localhost:3000/")  // Erlaubte Ursprünge
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Erlaubte Methoden
                        .allowedHeaders("*")  // Alle Header erlaubt
                        .allowCredentials(true);  // Cookies und Authentifizierung erlauben
            }
        };
    }
}
