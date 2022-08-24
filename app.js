const express = require('express');
const app = express();
require('dotenv').config();
const { PORT } = process.env;
const urlRoutes = require('./routes/url');
const urlRoutesV2 = require('./routes/url_v2');

app.use(express.json());
app.use(`/api/1.0/url`, urlRoutes);
app.use(`/api/2.0/url`, urlRoutesV2);

app.listen(3000, () => {
  console.log(`server is listen on port ${process.env.PORT}....`);
});
