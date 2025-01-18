const express = require('express');
const app = express();
app.get('/', async (req, res, next) => {
  try {
    await doSomethingAsync();
    res.send('OK');
  } catch (err) {
    next(err); // Pass the error to Express.js error handling
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

async function doSomethingAsync() {
  // Simulate an asynchronous operation that might fail
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.5; // 50% chance of failure
      if (shouldFail) {
        reject(new Error('Something went wrong'));
      } else {
        resolve();
      }
    }, 1000);
  });
}