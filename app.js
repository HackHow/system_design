const express = require('express');
const app = express();
require('dotenv').config();
const { PORT } = process.env;
const urlRoutes = require('./routes/url');
const urlRoutesV2 = require('./routes/url_v2');
const keyGenRoutesV2 = require('./routes/key_gen');

app.use(express.json());
app.use(`/`, (req, res) => {
  res.status(200).send({ ok: 'ok' });
});
app.use(`/api/1.0/url`, urlRoutes);
app.use(`/api/2.0/url`, urlRoutesV2);
app.use(`/api/2.0/keys`, keyGenRoutesV2);

app.listen(PORT, () => {
  console.log(`server is listen on port ${PORT}....`);
});
