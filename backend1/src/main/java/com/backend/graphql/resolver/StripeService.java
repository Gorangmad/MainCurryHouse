package com.backend.graphql.resolver;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Value;

@Service
public class StripeService {
    private static final Logger logger = LoggerFactory.getLogger(StripeService.class);


    public StripeService() {
        Stripe.apiKey = ${stripeApiKey};
        logger.info("Stripe API Key set successfully");
    }

    public PaymentIntent createPayment(Float amount, String currency, String paymentMethodId) throws StripeException {
        logger.info("Processing Stripe payment: Amount = {}, Currency = {}, PaymentMethodId = {}", amount, currency, paymentMethodId);

        if (amount == null || currency == null || paymentMethodId == null) {
            logger.error("Invalid Stripe request: Missing parameters.");
            throw new IllegalArgumentException("Amount, currency, and paymentMethodId cannot be null.");
        }

        try {
            PaymentIntentCreateParams createParams = PaymentIntentCreateParams.builder()
                    .setAmount((long) (amount * 100)) // Convert to cents
                    .setCurrency(currency)
                    .setPaymentMethod(paymentMethodId) // Attach payment method
                    .setConfirmationMethod(PaymentIntentCreateParams.ConfirmationMethod.AUTOMATIC) // ✅ Set to automatic
                    .setConfirm(true) // ✅ Automatically confirm the payment
                    .build();

            PaymentIntent paymentIntent = PaymentIntent.create(createParams);

            logger.info("Stripe PaymentIntent created: ID = {}, Status = {}, ClientSecret = {}", 
                        paymentIntent.getId(), 
                        paymentIntent.getStatus(), 
                        paymentIntent.getClientSecret());

            return paymentIntent;
        } catch (StripeException e) {
            logger.error("Stripe API Error: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to process Stripe payment: " + e.getMessage(), e);
        }
    }
}
