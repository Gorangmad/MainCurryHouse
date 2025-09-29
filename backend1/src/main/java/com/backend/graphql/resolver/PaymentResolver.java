package com.backend.graphql.resolver;

import com.stripe.model.PaymentIntent;
import com.backend.graphql.util.PaymentMethodType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
public class PaymentResolver {

    private static final Logger logger = LoggerFactory.getLogger(PaymentResolver.class);
    private final StripeService stripeService;

    public PaymentResolver(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    @MutationMapping
    public PaymentResponse createPayment(@Argument Float amount,
                                         @Argument String currency,
                                         @Argument PaymentMethodType paymentMethod) {
        logger.info("Received payment request: Amount = {}, Currency = {}, PaymentMethod = {}", amount, currency, paymentMethod);
    
        if ("CASH".equalsIgnoreCase(paymentMethod.toString())) {
            return new PaymentResponse("cash_" + System.currentTimeMillis(), "PAID", null);
        }
    
        if ("STRIPE".equalsIgnoreCase(paymentMethod.toString()) || "CARD".equalsIgnoreCase(paymentMethod.toString())) {
            try {
                PaymentIntent paymentIntent = stripeService.createPayment(amount, currency);
                return new PaymentResponse(paymentIntent.getId(), paymentIntent.getStatus(), paymentIntent.getClientSecret());
            } catch (com.stripe.exception.StripeException e) {
                logger.error("Stripe payment failed", e);
                throw new RuntimeException("Stripe payment failed: " + e.getMessage(), e);
            }
        }
    
        throw new IllegalArgumentException("Invalid payment method: " + paymentMethod);
    }

}
