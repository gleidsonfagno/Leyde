package com.leyde.backend.api.controller;

import org.slf4j.MDC;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.net.URI;
import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status,
                                                                  WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            errors.put(fieldName, message);
        });

        Map<String, Object> problem = new HashMap<>();
        problem.put("type", URI.create("/problem/validation-error"));
        problem.put("title", "Validation Failed");
        problem.put("status", HttpStatus.BAD_REQUEST.value());
        problem.put("detail", "Validation errors occurred");
        problem.put("instance", request.getDescription(false));
        problem.put("timestamp", OffsetDateTime.now().toString());
        problem.put("correlationId", MDC.get("correlationId"));
        problem.put("errors", errors);

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(MediaType.parseMediaType("application/problem+json"));
        return new ResponseEntity<>(problem, responseHeaders, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleAll(Exception ex, WebRequest request) {
        Map<String, Object> problem = new HashMap<>();
        problem.put("type", URI.create("/problem/internal-error"));
        problem.put("title", "Internal Server Error");
        problem.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        problem.put("detail", ex.getMessage());
        problem.put("instance", request.getDescription(false));
        problem.put("timestamp", OffsetDateTime.now().toString());
        problem.put("correlationId", MDC.get("correlationId"));

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(MediaType.parseMediaType("application/problem+json"));
        return new ResponseEntity<>(problem, responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
