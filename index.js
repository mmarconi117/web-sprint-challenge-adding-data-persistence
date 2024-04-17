const express = require('express');
const apiRouter = require('./api/server'); // Import server module

const PORT = process.env.PORT || 3000;

const app = express();

// Mount server routes
app.use('/api', apiRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
