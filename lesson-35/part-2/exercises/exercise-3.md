# Exercise 3: Error Handling with Custom Errors

## Objective
Implement a complete error handling system using custom error classes.

## Requirements
1. Create a route handler that can throw different types of errors
2. Implement proper error handling middleware
3. Return appropriate HTTP status codes for different error types
4. Include meaningful error messages

## Scenario
You're building a user management API endpoint that:
- Fetches a user by ID
- Validates the user exists
- Checks if the current user has permission to view the profile
- Returns the user data or appropriate error

## Example Implementation
```javascript
// Route handler
app.get('/api/users/:id', async (req, res, next) => {
    try {
        // Your implementation here
    } catch (error) {
        next(error);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    // Your implementation here
});
```

## Test Cases
1. **Valid Request**: GET /api/users/123 with valid auth
   - Expected: 200 OK with user data

2. **Missing ID**: GET /api/users/
   - Expected: 400 Bad Request with validation error

3. **User Not Found**: GET /api/users/999
   - Expected: 404 Not Found

4. **Unauthorized**: GET /api/users/123 without auth
   - Expected: 401 Unauthorized

5. **Forbidden**: GET /api/users/123 accessing another user's data
   - Expected: 403 Forbidden

## Hints
- Create custom error classes for different scenarios
- Use a centralized error handler middleware
- Consider using async/await with try-catch
- Log errors for debugging purposes

## Bonus Challenge
- Add request ID to error logs for tracing
- Implement different error responses for production vs development
- Add error metrics/monitoring
