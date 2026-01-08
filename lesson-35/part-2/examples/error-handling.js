/**
 * Lesson 35 Part 2 - Error Handling Patterns
 * 
 * This example demonstrates different error handling strategies
 * in server applications.
 */

// Custom Error Classes
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        
        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends AppError {
    constructor(message) {
        super(message, 400);
        this.name = 'ValidationError';
    }
}

class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}

class UnauthorizedError extends AppError {
    constructor(message) {
        super(message, 401);
        this.name = 'UnauthorizedError';
    }
}

// Error Handler Factory
function createErrorHandler(options = {}) {
    const { includeStack = false } = options;
    
    return function errorHandler(err, req, res, next) {
        // Set default status code
        err.statusCode = err.statusCode || 500;
        err.status = err.status || 'error';
        
        // Log error for debugging
        console.error('Error occurred:', {
            name: err.name,
            message: err.message,
            statusCode: err.statusCode,
            path: req.path,
            method: req.method
        });
        
        // Prepare error response
        const errorResponse = {
            status: err.status,
            message: err.message
        };
        
        // Include stack trace in development
        if (includeStack && process.env.NODE_ENV === 'development') {
            errorResponse.stack = err.stack;
        }
        
        // Send response
        res.status(err.statusCode).json(errorResponse);
    };
}

// Example route with error handling
function exampleRouteWithErrors(req, res, next) {
    try {
        const { id } = req.params;
        
        // Validation
        if (!id) {
            throw new ValidationError('ID parameter is required');
        }
        
        // Simulate resource not found
        const resource = findResourceById(id);
        if (!resource) {
            throw new NotFoundError(`Resource with ID ${id} not found`);
        }
        
        // Check authorization
        if (!req.user || req.user.id !== resource.ownerId) {
            throw new UnauthorizedError('You are not authorized to access this resource');
        }
        
        res.json({ resource });
    } catch (error) {
        next(error);
    }
}

// Async error wrapper
function catchAsync(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
}

// Example async route with error handling
const asyncRouteExample = catchAsync(async (req, res, next) => {
    const data = await someAsyncOperation();
    
    if (!data) {
        throw new NotFoundError('Data not found');
    }
    
    res.json({ data });
});

// Helper function (simulated)
function findResourceById(id) {
    // Simulated database lookup
    if (id === '1') {
        return { id: '1', name: 'Resource 1', ownerId: 1 };
    }
    return null;
}

async function someAsyncOperation() {
    // Simulated async operation
    return new Promise((resolve) => {
        setTimeout(() => resolve({ message: 'Success' }), 100);
    });
}

module.exports = {
    AppError,
    ValidationError,
    NotFoundError,
    UnauthorizedError,
    createErrorHandler,
    catchAsync,
    exampleRouteWithErrors,
    asyncRouteExample
};
