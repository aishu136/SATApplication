package com.example.SAT.Application.exceptions;

public class DatabaseOperationException extends RuntimeException {
    private static final long serialVersionUID = 1L;

	public DatabaseOperationException(String message) {
        super(message);
    }
}
