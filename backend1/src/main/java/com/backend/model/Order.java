package com.backend.model;

import java.util.List;

public class Order {
    private String id; // Unique order ID
    private String customerUsername; // Username of the customer
    private List<OrderProduct> products; // List of ordered products
    private float totalAmount; // Total cost of the order
    private String status; // Order status (e.g., "pending", "shipped")
    private String createdAt; // Order creation date

    // Additional fields
    private String companyName; // Customer's company name (if applicable)
    private String email; // Customer's email address
    private String address; // Delivery address of the order
    private String phoneNumber; // Customer's phone number
    private String notes; // Additional notes about the order
    private double deliveryCost; // Cost of delivery for the order
    private String paymentMethod; // "CASH" oder "CARD"
    private OrderType orderType; // "DELIVERY" oder "PICKUP"

public String getPaymentMethod() {
    return paymentMethod;
}

public void setPaymentMethod(String paymentMethod) {
    this.paymentMethod = paymentMethod;
}

public OrderType getOrderType() {
    return orderType;
}

public void setOrderType(OrderType orderType) {
    this.orderType = orderType;
}

    // Default constructor
    public Order() {
    }

    // Parameterized constructor
    public Order(String id, String customerUsername, List<OrderProduct> products, float totalAmount,
                 String status, String createdAt, String companyName, String email,
                 String address, String phoneNumber, String notes, Double deliveryCost, String paymentMethod, OrderType orderType) {
        this.id = id;
        this.customerUsername = customerUsername;
        this.products = products;
        this.totalAmount = totalAmount;
        this.status = status;
        this.createdAt = createdAt;
        this.companyName = companyName;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.notes = notes;
        this.deliveryCost = deliveryCost;
        this.paymentMethod = paymentMethod;
        this.orderType = orderType;
    }

    // Getter and setter methods
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCustomerUsername() {
        return customerUsername;
    }

    public void setCustomerUsername(String customerUsername) {
        this.customerUsername = customerUsername;
    }

    public List<OrderProduct> getProducts() {
        return products;
    }

    public void setProducts(List<OrderProduct> products) {
        this.products = products;
    }

    public float getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(float totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Double getDeliveryCost() {
        return deliveryCost;
    }

    public void setDeliveryCost(Double deliveryCost) {
        this.deliveryCost = deliveryCost;
    }


    // toString method for debugging purposes
    @Override
    public String toString() {
        return "Order{" +
                "id='" + id + '\'' +
                ", customerUsername='" + customerUsername + '\'' +
                ", products=" + products +
                ", totalAmount=" + totalAmount +
                ", status='" + status + '\'' +
                ", createdAt='" + createdAt + '\'' +
                ", companyName='" + companyName + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", deliveryCost='" + deliveryCost + '\'' +
                ", notes='" + notes + '\'' +
                '}';
    }
}

