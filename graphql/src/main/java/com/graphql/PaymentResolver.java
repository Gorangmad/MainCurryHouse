package com.graphql;

import com.stripe.model.PaymentIntent;
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
    public PaymentIntent createPayment(@Argument Float amount, 
                                       @Argument String currency, 
                                       @Argument String paymentMethod, 
                                       @Argument String paymentMethodId) {
        logger.info("🎯 Received payment request: Amount = {}, Currency = {}, PaymentMethod = {}", amount, currency, paymentMethod);
    
        try {
            if ("CASH".equalsIgnoreCase(paymentMethod)) {
                logger.info("💵 Cash payment. No processing needed.");
                PaymentIntent cashPayment = new PaymentIntent();
                cashPayment.setId("cash_" + System.currentTimeMillis());
                cashPayment.setStatus("PAID");
                return cashPayment;
            }
    
            if ("STRIPE".equalsIgnoreCase(paymentMethod) || "CARD".equalsIgnoreCase(paymentMethod)) {
                if (paymentMethodId == null || paymentMethodId.isEmpty()) {
                    throw new IllegalArgumentException("❌ Missing paymentMethodId for STRIPE/CARD");
                }
                return stripeService.createPayment(amount, currency, paymentMethodId);
            }
    
            throw new IllegalArgumentException("❌ Invalid payment method: " + paymentMethod);
        } catch (Exception e) {
            logger.error("❌ Payment processing error: {}", e.getMessage(), e);
            throw new RuntimeException("Payment processing failed: " + e.getMessage(), e);
        }
    }
    
}
