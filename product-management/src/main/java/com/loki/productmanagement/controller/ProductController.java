package com.loki.productmanagement.controller;

import com.loki.productmanagement.dto.ProductReposneDTO;
import com.loki.productmanagement.dto.ProductRequestDTO;
import com.loki.productmanagement.entity.Product;
import com.loki.productmanagement.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService prdtService;

    public ProductController(ProductService prdtService) {
        this.prdtService = prdtService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductReposneDTO addProduct(@Valid @RequestBody ProductRequestDTO prdt) {
        return prdtService.saveProduct(prdt);
    }

    @GetMapping
    public List<ProductReposneDTO> showAllPrdts() {
        return prdtService.findAllProducuts();
    }

    @GetMapping("/{id}")
    public ProductReposneDTO getPrdtById(@PathVariable Long id) {
        return prdtService.findById(id);
    }

    @PutMapping("/{id}")
    public ProductReposneDTO updatePrdt(@PathVariable Long id, @Valid @RequestBody ProductRequestDTO prdt) {
        return prdtService.updtPrdt(id, prdt);
    }

    @DeleteMapping("/{id}")
    public void deletePrdt(@PathVariable Long id) {
        prdtService.deletePrdt(id);
    }

}
