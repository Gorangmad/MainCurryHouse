package com.backend.graphql.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.backend.model.Order;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.List;

@Component
public class OrderDataUtil {

    private static final Logger logger = LoggerFactory.getLogger(OrderDataUtil.class);
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private static final String DATA_SERVICE_URL = System.getenv().getOrDefault("API_URL", "http://localhost:8080") + "/orders-data";

    // Load all orders from the data service
    public List<Order> loadOrders() throws IOException {
        logger.info("Fetching all orders from {}", DATA_SERVICE_URL);
        ResponseEntity<Order[]> response = restTemplate.getForEntity(DATA_SERVICE_URL, Order[].class);

        if (response.getBody() == null) {
            logger.warn("Received empty order list");
            return List.of(); // Return an empty list instead of null
        }

        logger.info("Loaded {} orders", response.getBody().length);
        return List.of(response.getBody());
    }

    // Load a specific order by ID
    public Order loadOrder(String id) throws IOException {
        String url = DATA_SERVICE_URL + "/" + id;
        logger.info("Fetching order with ID: {}", id);
        ResponseEntity<Order> response = restTemplate.getForEntity(url, Order.class);

        if (response.getBody() == null) {
            logger.warn("No order found with ID: {}", id);
            return null;
        }

        logger.info("Order found: {}", response.getBody());
        return response.getBody();
    }

    // Save a single order
    public void saveOrder(Order order) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Order> request = new HttpEntity<>(order, headers);

        logger.info("Saving order: {}", order);

        ResponseEntity<Void> response = restTemplate.exchange(DATA_SERVICE_URL, HttpMethod.POST, request, Void.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            logger.info("Order saved successfully");
        } else {
            logger.error("Failed to save order, Response: {}", response);
            throw new IOException("Error saving order");
        }
    }

    // Save multiple orders (Fixed: Sends one by one)
    public void saveOrders(List<Order> orders) throws IOException {
        logger.info("Saving {} orders individually", orders.size());

        for (Order order : orders) {
            saveOrder(order);
        }

        logger.info("All orders saved successfully");
    }

    // Function to Update Order
    public void updateOrder(String orderId, Order updatedOrder) throws IOException {
        String url = DATA_SERVICE_URL + "/" + orderId;
        logger.info("Updating order with ID: {}", orderId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Order> request = new HttpEntity<>(updatedOrder, headers);

        ResponseEntity<Void> response = restTemplate.exchange(url, HttpMethod.PUT, request, Void.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            logger.info("Order {} updated successfully", orderId);
        } else {
            logger.error("Failed to update order {}, Response: {}", orderId, response);
            throw new IOException("Error updating order");
        }
    }
}


