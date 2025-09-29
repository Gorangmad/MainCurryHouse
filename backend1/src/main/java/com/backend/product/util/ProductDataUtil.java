// package com.backend.product.util;

// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.backend.product.controller.ProductController;
// import com.backend.model.Product;
// import org.springframework.stereotype.Component;
// import org.springframework.web.client.RestTemplate;
// import org.springframework.http.ResponseEntity;
// import org.springframework.http.HttpEntity;
// import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpMethod;

// import java.io.IOException;
// import java.util.Arrays;
// import java.util.List;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;


// /**
//  * Utility class for handling product data operations by interacting with an external data service.
//  */
// @Component
// public class ProductDataUtil {

//     private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    
//     private final ObjectMapper objectMapper = new ObjectMapper();
//     private final RestTemplate restTemplate = new RestTemplate();
    
//     // API endpoint for fetching and storing product data
//     private static final String DATA_SERVICE_URL = "http://localhost:3000/products-data"; 

//     /**
//      * Loads the list of products from the external data service.
//      *
//      * @return List of products retrieved from the service.
//      * @throws IOException if an error occurs while fetching the data.
//      */
//     public List<Product> loadProducts() throws IOException {
//         ResponseEntity<Product[]> response = restTemplate.getForEntity(DATA_SERVICE_URL, Product[].class);
//         return Arrays.asList(response.getBody());
//     }

//     /**
//      * Saves the list of products by sending a POST request to the external data service.
//      *
//      * @param products List of products to be saved.
//      * @throws IOException if an error occurs while saving the products.
//      */
//     public void saveProduct(Product product) throws IOException {
//         HttpHeaders headers = new HttpHeaders();
//         headers.set("Content-Type", "application/json");
        
//         HttpEntity<Product> request = new HttpEntity<>(product, headers);
        
//         // Send only the new product to the data service (Ensure this endpoint exists)
//         restTemplate.exchange(DATA_SERVICE_URL + "/add", HttpMethod.POST, request, Void.class);
//     }
    
//     /**
//      * Updates an existing product by sending a PUT request to the external data service.
//      *
//      * @param product Updated product data.
//      * @throws IOException if an error occurs while updating the product.
//      */
//     public void updateProduct(Product product) throws IOException {
//         HttpHeaders headers = new HttpHeaders();
//         headers.set("Content-Type", "application/json");
        
//         HttpEntity<Product> request = new HttpEntity<>(product, headers);

//         logger.info("Received Product: {}", product); // Logs full product details
//         // Send only the new product to the data service (Ensure this endpoint exists)
//         restTemplate.exchange(DATA_SERVICE_URL +"/"+ product.getProductId(), HttpMethod.PUT, request, Void.class);
//     }

//     /**
//      * Deletes a product by sending a DELETE request to the external data service.
//      *
//      * @param productId The ID of the product to delete.
//      * @throws IOException if an error occurs while deleting the product.
//      */
//     public void deleteProduct(String productId) throws IOException {
//         HttpHeaders headers = new HttpHeaders();
//         HttpEntity<Void> request = new HttpEntity<>(headers);
    
//         logger.info("Deleting Product with ID: {}", productId);
        
//         restTemplate.exchange(DATA_SERVICE_URL + "/" + productId, HttpMethod.DELETE, request, Void.class);
//     }


// }
