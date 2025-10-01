package com.backend.graphql.resolver;

import com.backend.model.Order;
import com.backend.model.OrderInput;
import com.backend.model.OrderProduct;
import com.backend.graphql.util.OrderDataUtil;
import com.backend.graphql.util.ProductServiceUtil;
import com.backend.OrderWebSocketHandler;
import com.backend.email.MailService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Controller
public class OrderResolver {

    private final OrderDataUtil orderDataUtil;
    private final ProductServiceUtil productServiceUtil;
    private final OrderWebSocketHandler webSocketHandler;
    private final MailService mailService;


    public OrderResolver(OrderDataUtil orderDataUtil,
                         ProductServiceUtil productServiceUtil,
                         OrderWebSocketHandler webSocketHandler,
                         MailService mailService) {
        this.orderDataUtil = orderDataUtil;
        this.productServiceUtil = productServiceUtil;
        this.webSocketHandler = webSocketHandler;
        this.mailService = mailService;
    }

    // Query to retrieve orders by customerUsername
    @QueryMapping
    public List<Order> ordersByCustomer(@Argument String customerUsername) throws IOException {
        return orderDataUtil.loadOrders().stream()
                .filter(order -> order.getCustomerUsername().equalsIgnoreCase(customerUsername))
                .toList();
    }

    // Query to retrieve all orders
    @QueryMapping
    public List<Order> allOrders() throws IOException {
        return orderDataUtil.loadOrders();
    }

    // Query to fetch a single order by ID
    @QueryMapping
    public Order order(@Argument String id) throws IOException {
        return orderDataUtil.loadOrders().stream()
                .filter(order -> order.getId().equalsIgnoreCase(id))
                .findFirst()
                .orElse(null);
    }

    // Mutation: Create a new order
    @MutationMapping
    public Order createOrder(@Argument OrderInput input) throws IOException {
        List<OrderProduct> products = input.getProducts().stream()
                .map(productInput -> new OrderProduct(
                        productInput.getProductId(),
                        productInput.getName(),
                        productInput.getQuantity(),
                        productInput.getUnitPrice(),
                        productInput.getSelectedSize() // ← Include this!
                ))
                .collect(Collectors.toList());

        Order newOrder = new Order(
                UUID.randomUUID().toString(),
                input.getCustomerUsername(),
                products,
                calculateTotalAmount(products) + (float) input.getDeliveryCost(),
                "Pending",
                LocalDateTime.now().toString(),
                input.getCompanyName(),
                input.getEmail(),
                input.getAddress(),
                input.getPhoneNumber(),
                input.getNotes(),
                input.getDeliveryCost(),
                input.getPaymentMethod(),
                input.getOrderType()
        );

        // Save the order
        orderDataUtil.saveOrder(newOrder);

        // Send to Android app via WebSocket
        ObjectMapper mapper = new ObjectMapper();
        String orderJson = mapper.writeValueAsString(newOrder);
        webSocketHandler.sendOrderUpdate(orderJson);

        // E-Mail-Versand
        String customerSubject = "Ihre Bestellung bei " + newOrder.getCompanyName();
        String ownerSubject = "Neue Bestellung von " + newOrder.getCustomerUsername();
        
        String emailContent = buildOrderEmailContent(newOrder);
        
        mailService.sendEmail(newOrder.getEmail(), customerSubject, emailContent);
        mailService.sendEmail("info@maincurryhouse.com", ownerSubject, emailContent); // Besitzer-Adresse anpassen

        return newOrder;
    }

    // Mutation: Update order status
    @MutationMapping
    public Order updateOrderStatus(@Argument String orderId, @Argument String newStatus) throws IOException {
        List<Order> orders = orderDataUtil.loadOrders();

        Order orderToUpdate = orders.stream()
                .filter(order -> order.getId().equalsIgnoreCase(orderId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));

        List<String> validStatuses = List.of("Pending", "Shipped", "Done");
        if (!validStatuses.contains(newStatus)) {
            throw new IllegalArgumentException("Invalid status: " + newStatus);
        }

        orderToUpdate.setStatus(newStatus);
        orderDataUtil.updateOrder(orderId, orderToUpdate);

        return orderToUpdate;
    }

    // Helper: Calculate total amount
    private float calculateTotalAmount(List<OrderProduct> products) {
        return (float) products.stream()
                .mapToDouble(product -> product.getQuantity() * (product.getUnitPrice() != null ? product.getUnitPrice() : 0))
                .sum();
    }

    private String buildOrderEmailContent(Order order) {
        StringBuilder sb = new StringBuilder();
        sb.append("<h2>Bestellung von: ").append(order.getCustomerUsername()).append("</h2>");
        sb.append("<p><b>Bestell-ID:</b> ").append(order.getId()).append("</p>");
        sb.append("<p><b>Gesamtbetrag:</b> ").append(order.getTotalAmount()).append(" €</p>");
        sb.append("<p><b>Lieferadresse:</b> ").append(order.getAddress()).append("</p>");
        sb.append("<p><b>Zahlungsmethode:</b> ").append(order.getPaymentMethod()).append("</p>");
        sb.append("<h3>Produkte:</h3><ul>");
    
        for (OrderProduct product : order.getProducts()) {
            sb.append("<li>")
              .append(product.getName());
            
            if (product.getSelectedSize() != null) {
                sb.append(" (").append(product.getSelectedSize()).append(")");
            }
            
            sb.append(" (x").append(product.getQuantity()).append(") - ")
              .append(product.getUnitPrice()).append(" €/Stück")
              .append("</li>");

        }
    
        sb.append("</ul>");
        sb.append("<p><b>Notizen:</b> ").append(order.getNotes() != null ? order.getNotes() : "-").append("</p>");
        return sb.toString();
    }
    
}
