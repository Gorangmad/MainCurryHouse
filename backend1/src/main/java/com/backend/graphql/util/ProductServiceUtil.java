package com.backend.graphql.util;

import com.backend.model.Product;

import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import java.io.IOException;
import java.util.List;

@Component
public class ProductServiceUtil {
    private final RestTemplate restTemplate = new RestTemplate();
    private static final String PRODUCT_SERVICE_URL = "http://localhost:3000/products-data";

    // ✅ Get all products (including availableQuantity)
    public List<Product> loadProducts() throws IOException {
        return List.of(restTemplate.getForObject(PRODUCT_SERVICE_URL, Product[].class));
    }

    public Product updateProductQuantity(String productId, int newQuantity) throws IOException {
        String url = PRODUCT_SERVICE_URL + "/" + productId + "/quantity/" + newQuantity;
        
        return restTemplate.exchange(url, HttpMethod.PUT, null, Product.class).getBody();
    }


    public Product getProductById(String productId) throws IOException {
        return restTemplate.getForObject(PRODUCT_SERVICE_URL + "/" + productId, Product.class);
    }
    
}
