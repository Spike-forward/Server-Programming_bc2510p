/**
 * Lesson 35 Part 2 - Complete Server Example
 * 
 * This example brings together all the concepts covered in this lesson:
 * - Middleware
 * - Async handlers
 * - Error handling
 * 
 * To run this example:
 * 1. Install dependencies: npm install
 * 2. Run: node examples/server-example.js
 * 3. Test with: curl http://localhost:3000/api/health
 */

// Note: This is a demonstration file. 
// Uncomment the code below and run: npm install

/*
const express = require('express');
const app = express();

// Import our custom modules
const { 
    loggingMiddleware, 
    authenticationMiddleware 
} = require('./middleware-example');

const { asyncHandler } = require('./async-handler');

const {
    ValidationError,
    NotFoundError,
    createErrorHandler,
    catchAsync
} = require('./error-handling');

// Middleware setup
app.use(express.json());
app.use(loggingMiddleware);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString() 
    });
});

// Public endpoint
app.get('/api/public', (req, res) => {
    res.json({ 
        message: 'This is a public endpoint',
        data: 'Anyone can access this'
    });
});

// Protected endpoint
app.get('/api/protected', 
    authenticationMiddleware,
    (req, res) => {
        res.json({ 
            message: 'This is a protected endpoint',
            user: req.user
        });
    }
);

// Async endpoint with error handling
app.get('/api/users/:id', 
    authenticationMiddleware,
    catchAsync(async (req, res) => {
        const { id } = req.params;
        
        // Validation
        if (!id || isNaN(id)) {
            throw new ValidationError('Invalid user ID');
        }
        
        // Simulate database query
        const user = await fetchUserFromDatabase(id);
        
        if (!user) {
            throw new NotFoundError(`User with ID ${id} not found`);
        }
        
        res.json({ user });
    })
);

// Error handling middleware (must be last)
app.use(createErrorHandler({ includeStack: true }));

// Helper function
async function fetchUserFromDatabase(id) {
    // Simulate async database operation
    return new Promise((resolve) => {
        setTimeout(() => {
            if (id === '1') {
                resolve({ id: 1, name: 'John Doe', email: 'john@example.com' });
            } else {
                resolve(null);
            }
        }, 100);
    });
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Try these endpoints:`);
    console.log(`  - GET http://localhost:${PORT}/api/health`);
    console.log(`  - GET http://localhost:${PORT}/api/public`);
    console.log(`  - GET http://localhost:${PORT}/api/protected (requires auth header)`);
    console.log(`  - GET http://localhost:${PORT}/api/users/1 (requires auth header)`);
});
*/

console.log('Server example - To run this example:');
console.log('1. Run: npm install (to install dependencies from package.json)');
console.log('2. Uncomment the code in this file');
console.log('3. Run: node examples/server-example.js');
