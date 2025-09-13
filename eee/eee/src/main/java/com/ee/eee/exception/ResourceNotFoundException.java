package com.ee.eee.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.NOT_FOUND)  // This makes Spring return 404 automatically
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message)
    {

        super(message);
    }
}
