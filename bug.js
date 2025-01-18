const express = require('express');
const app = express();
app.get('/', (req, res) => {
  // Asynchronous operation that might throw an error
  doSomethingAsync().then(() => {
    res.send('OK');
  }).catch(err => {
    // Error handling that doesn't propagate the error to Express
    console.error('Error:', err);
  });
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