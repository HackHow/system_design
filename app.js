const express = require('express');
const app = express();
require('dotenv').config();
const { PORT } = process.env;
const urlRoutes = require('./routes/url');

app.use(`/api/1.0/url`, urlRoutes);

app.listen(3000, () => {
  console.log(`server is listen on port ${process.env.PORT}....`);
});
