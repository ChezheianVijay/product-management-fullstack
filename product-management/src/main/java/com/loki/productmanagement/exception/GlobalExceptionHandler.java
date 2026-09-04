package com.loki.productmanagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundEx(ResourceNotFoundException resrcntfnd) {
        return new ResponseEntity<>(resrcntfnd.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidException(MethodArgumentNotValidException mthdArgNotVldEx) {
        Map<String, String> errors = new HashMap<>();

        mthdArgNotVldEx.getBindingResult().getFieldErrors().forEach(x -> errors.put(x.getField(), x.getDefaultMessage()));

        return new ResponseEntity<>(errors, HttpStatus.NOT_FOUND);
    }

}
