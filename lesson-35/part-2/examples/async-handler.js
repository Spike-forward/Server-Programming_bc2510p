/**
 * Lesson 35 Part 2 - Async Handler Example
 * 
 * This example demonstrates proper async/await patterns for handling
 * asynchronous operations in server routes.
 */

// Example 1: Basic async handler wrapper
function asyncHandler(fn) {
    return function(req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

// Example 2: Database query handler (simulated)
const getUserById = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    
    // Simulated database query
    const user = await simulateDbQuery(userId);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ user });
});

// Example 3: Multiple async operations
const getCompleteUserData = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    
    // Execute multiple async operations
    const [user, posts, comments] = await Promise.all([
        fetchUser(userId),
        fetchUserPosts(userId),
        fetchUserComments(userId)
    ]);
    
    res.json({
        user,
        posts,
        comments
    });
});

// Helper functions (simulated)
function simulateDbQuery(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: userId, name: 'John Doe', email: 'john@example.com' });
        }, 100);
    });
}

async function fetchUser(userId) {
    // Simulated async operation
    return { id: userId, name: 'John Doe' };
}

async function fetchUserPosts(userId) {
    // Simulated async operation
    return [
        { id: 1, title: 'First Post', userId },
        { id: 2, title: 'Second Post', userId }
    ];
}

async function fetchUserComments(userId) {
    // Simulated async operation
    return [
        { id: 1, text: 'Great post!', userId },
        { id: 2, text: 'Thanks for sharing', userId }
    ];
}

module.exports = {
    asyncHandler,
    getUserById,
    getCompleteUserData
};
