# Exercise 2: Implement Rate Limiting

## Objective
Create a simple rate limiting middleware to prevent API abuse.

## Requirements
1. Create a middleware function called `rateLimiter`
2. Track the number of requests per IP address
3. Allow a maximum of 10 requests per minute per IP
4. Return 429 (Too Many Requests) if limit is exceeded
5. Reset the counter after 1 minute

## Example Usage
```javascript
app.use(rateLimiter({ maxRequests: 10, windowMs: 60000 }));

app.get('/api/data', (req, res) => {
    res.json({ data: 'Your data here' });
});
```

## Expected Behavior
- First 10 requests from an IP: 200 OK
- 11th request within a minute: 429 Too Many Requests
- After 1 minute: Counter resets, requests allowed again

## Hints
- Use a JavaScript object or Map to store IP addresses and their request counts
- Store timestamp of first request for each IP
- Use `req.ip` to get the client's IP address
- Use `setTimeout` or check timestamps to implement the time window

## Solution Template
```javascript
const requestCounts = new Map();

function rateLimiter(options) {
    const { maxRequests, windowMs } = options;
    
    return function(req, res, next) {
        // Your code here
    };
}
```

## Bonus Challenge
- Add a header `X-RateLimit-Remaining` to show remaining requests
- Add a header `X-RateLimit-Reset` to show when the limit resets
