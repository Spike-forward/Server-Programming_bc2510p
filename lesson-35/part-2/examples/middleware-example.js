/**
 * Lesson 35 Part 2 - Middleware Example
 * 
 * This example demonstrates how to create and use middleware in a server application.
 * Middleware functions have access to the request object (req), response object (res),
 * and the next middleware function in the application's request-response cycle.
 */

// Example 1: Simple logging middleware
function loggingMiddleware(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next(); // Pass control to the next middleware
}

// Example 2: Authentication middleware
function authenticationMiddleware(req, res, next) {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Verify token (simplified example)
    if (token === 'valid-token') {
        req.user = { id: 1, name: 'John Doe' };
        next();
    } else {
        return res.status(403).json({ error: 'Invalid token' });
    }
}

// Example 3: Error handling middleware
function errorHandlingMiddleware(err, req, res, next) {
    console.error('Error:', err.message);
    
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: err.status || 500
        }
    });
}

// Example usage with Express.js (pseudo-code)
// const express = require('express');
// const app = express();
//
// app.use(loggingMiddleware);
// app.use('/api/*', authenticationMiddleware);
// 
// app.get('/api/data', (req, res) => {
//     res.json({ message: 'Protected data', user: req.user });
// });
//
// app.use(errorHandlingMiddleware);
//
// app.listen(3000, () => console.log('Server running on port 3000'));

module.exports = {
    loggingMiddleware,
    authenticationMiddleware,
    errorHandlingMiddleware
};
