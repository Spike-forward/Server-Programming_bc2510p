# Exercise 1: Create Custom Middleware

## Objective
Create a custom middleware function that validates request data.

## Requirements
1. Create a middleware function called `validateRequestBody`
2. The middleware should check if the request body contains required fields
3. If required fields are missing, return a 400 status with an error message
4. If all fields are present, call the next() function

## Example Usage
```javascript
const requiredFields = ['username', 'email', 'password'];

app.post('/register', 
    validateRequestBody(requiredFields),
    (req, res) => {
        res.json({ message: 'Registration successful' });
    }
);
```

## Expected Behavior
- If body is `{ username: 'john' }`, return 400 with error: "Missing required fields: email, password"
- If body is `{ username: 'john', email: 'john@example.com', password: 'pass123' }`, proceed to next middleware

## Hints
- Use `Object.keys()` to check for required fields
- Use `Array.filter()` to find missing fields
- Remember to call `next()` if validation passes

## Solution Template
```javascript
function validateRequestBody(requiredFields) {
    return function(req, res, next) {
        // Your code here
    };
}
```
