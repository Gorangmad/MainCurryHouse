package com.backend.dataservice.controller.controller;


// REST controller for managing product data stored in a JSON file.

import com.backend.model.Product;
import com.backend.dataservice.util.JsonFileUtil;
import com.backend.dataservice.util.ProductRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@RestController("dataserviceProductController")  // 💡 Eindeutiger Name

@RequestMapping("/products-data")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // ✅ Get all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    // // Adds multiple new products to the JSON file and returns the updated product list.
    // @PostMapping
    // public List<Product> addProducts(@RequestBody List<Product> newProducts) throws IOException {
    //     List<Product> products = jsonFileUtil.readJsonFile(FILE_PATH, new TypeReference<List<Product>>() {});
    //     products.addAll(newProducts);
    //     jsonFileUtil.writeJsonFile(FILE_PATH, products);
    //     return products;
    // }

    // @PostMapping("/add")
    // public void addProduct(@RequestBody Product newProduct) throws IOException {
    //     List<Product> products = jsonFileUtil.readJsonFile(FILE_PATH, new TypeReference<List<Product>>() {});
    //     products.add(newProduct); // Add only the new product
    //     jsonFileUtil.writeJsonFile(FILE_PATH, products); // Save the updated list
    // }


    // // Deletes a product by its ID and returns the updated product list.
    // @DeleteMapping("/{productId}")
    // public List<Product> deleteProduct(@PathVariable String productId) throws IOException {
    //     List<Product> products = new ArrayList<>(jsonFileUtil.readJsonFile(FILE_PATH, new TypeReference<List<Product>>() {}));
    
    //     boolean removed = products.removeIf(product -> product.getProductId().equals(productId));
    
    //     if (!removed) {
    //         throw new RuntimeException("Product with ID " + productId + " not found.");
    //     }
    
    //     jsonFileUtil.writeJsonFile(FILE_PATH, products);
    
    //     return products;
    // }


    // // Retrieves a specific product by its ID from the JSON file.
    // @GetMapping("/{productId}")
    // public Product getProductById(@PathVariable String productId) throws IOException {
    //     List<Product> products = jsonFileUtil.readJsonFile(FILE_PATH, new TypeReference<List<Product>>() {});
    //     return products.stream()
    //             .filter(product -> product.getProductId().equals(productId))
    //             .findFirst()
    //             .orElseThrow(() -> new RuntimeException("Product with ID " + productId + " not found."));
    // }

    // // Updates an existing product by its ID and returns the updated product.
    // @PutMapping("/{productId}")
    // public Product updateProduct(@PathVariable String productId, @RequestBody Product updatedProduct) throws IOException {
    //     List<Product> products = jsonFileUtil.readJsonFile(FILE_PATH, new TypeReference<List<Product>>() {});
    
    //     for (int i = 0; i < products.size(); i++) {
    //         if (products.get(i).getProductId().equals(productId)) {
    //             products.set(i, updatedProduct);
    //             jsonFileUtil.writeJsonFile(FILE_PATH, products);
    //             return updatedProduct;
    //         }
    //     }
    
    //     throw new RuntimeException("Product with ID " + productId + " not found.");
    // }


}