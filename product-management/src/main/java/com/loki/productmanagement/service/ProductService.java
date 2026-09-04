package com.loki.productmanagement.service;

import com.loki.productmanagement.dto.ProductReposneDTO;
import com.loki.productmanagement.dto.ProductRequestDTO;
import com.loki.productmanagement.entity.Product;
import com.loki.productmanagement.exception.ResourceNotFoundException;
import com.loki.productmanagement.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository prdtRepo;

    public ProductService(ProductRepository prdtRepo) {
        this.prdtRepo = prdtRepo;
    }

    public ProductReposneDTO saveProduct(ProductRequestDTO prdt) {

        Product prdty = new Product(prdt.getName(),prdt.getPrice(),prdt.getQuantity());
        Product prdts = prdtRepo.save(prdty);
        return new ProductReposneDTO(prdts.getId(), prdts.getName(), prdts.getPrice(), prdts.getQuantity());
    }

    public List<ProductReposneDTO> findAllProducuts() {
        return prdtRepo.findAll().stream().map(x -> new ProductReposneDTO(x.getId(), x.getName(), x.getPrice(), x.getQuantity())).toList();
    }

    public ProductReposneDTO findById(Long id) {
        Product prdts = prdtRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return new ProductReposneDTO(prdts.getId(), prdts.getName(), prdts.getPrice(), prdts.getQuantity());
    }

    public ProductReposneDTO updtPrdt(Long id, ProductRequestDTO prdt) {
        Product isExisting = prdtRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        isExisting.setName(prdt.getName());
        isExisting.setPrice(prdt.getPrice());
        isExisting.setQuantity(prdt.getQuantity());

        Product prdtSave = prdtRepo.save(isExisting);
        return new ProductReposneDTO(prdtSave.getId(), prdtSave.getName(), prdtSave.getPrice(), prdtSave.getQuantity());
    }

    public void deletePrdt(Long id) {
        Product isExisting = prdtRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        prdtRepo.delete(isExisting);
    }
}
