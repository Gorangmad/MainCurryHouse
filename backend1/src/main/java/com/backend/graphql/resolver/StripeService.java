package com.backend.graphql.resolver;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;


import jakarta.annotation.PostConstruct;


@Service
public class StripeService {
    private static final Logger logger = LoggerFactory.getLogger(StripeService.class);

    @Value("${stripe.apiKey}")
    private String apiKey;  // <- Holt den Key aus application.yml

    @PostConstruct
    public void init() {
        if (apiKey == null || apiKey.isBlank()) {
            logger.error("Stripe API key is not set in environment variables.");
            throw new IllegalStateException("Stripe API key is not set!");
        }
        Stripe.apiKey = apiKey;
        logger.info("Stripe API Key set from environment variable.");
    }

    public PaymentIntent createPayment(Float amount, String currency) throws StripeException {
    logger.info("Creating PaymentIntent only: Amount = {}, Currency = {}", amount, currency);

    if (amount == null || currency == null) {
        logger.error("Invalid Stripe request: Missing parameters.");
        throw new IllegalArgumentException("Amount and currency cannot be null.");
    }

    try {
        PaymentIntentCreateParams createParams = PaymentIntentCreateParams.builder()
            .setAmount((long) (amount * 100)) // cents!
            .setCurrency(currency)
            .build();

        PaymentIntent paymentIntent = PaymentIntent.create(createParams);

        logger.info("PaymentIntent created: ID = {}, Status = {}, ClientSecret = {}",
            paymentIntent.getId(),
            paymentIntent.getStatus(),
            paymentIntent.getClientSecret());

        return paymentIntent;
    } catch (StripeException e) {
        logger.error("Stripe API Error: {}", e.getMessage(), e);
        throw new RuntimeException("Failed to create PaymentIntent: " + e.getMessage(), e);
    }
}

}
