package com.backend.model;

import java.util.List;

public class OrderInput {
    private String customerUsername; // Username of the customer
    private String companyName; // Customer's company name (if applicable)
    private String email; // Customer's email address
    private String address; // Delivery address of the order
    private String phoneNumber; // Customer's phone number
    private String notes; // Additional notes about the order
    private List<ProductInput> products; // List of products in the order
    private double deliveryCost; // Cost of delivery for the order
    private String paymentMethod;
    private OrderType orderType;

    public OrderType getOrderType() {
        return orderType;
    }

    public void setOrderType(OrderType orderType) {
        this.orderType = orderType;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }
    
    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }


    // Getter and setter methods
    public String getCustomerUsername() {
        return customerUsername;
    }

    public void setCustomerUsername(String customerUsername) {
        this.customerUsername = customerUsername;
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

    public List<ProductInput> getProducts() {
        return products;
    }

    public void setProducts(List<ProductInput> products) {
        this.products = products;
    }

    public double getDeliveryCost() {
        return deliveryCost;
    }
    
    public void setDeliveryCost(double deliveryCost) {
        this.deliveryCost = deliveryCost;
    }
    
}
