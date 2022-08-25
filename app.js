const express = require('express');
const app = express();
require('dotenv').config();
const { PORT } = process.env;
const urlRoutes = require('./routes/url');

app.use(express.json());

app.use('/api/1.0/url', urlRoutes);

// Handle 404
app.use(function (req, res, next) {
  // console.log('req.query: ', req.query);
  console.log('404', req.url);
  return res.status(404).json({ error: 'error: 404' });
});

//Handle 500
app.use(function (err, req, res, next) {
  console.log('error handler: ', err);
  return res.status(500).render('error', { msg: 'error: 500' });
});

app.use('/', (req, res) => {
  res.status(200).send({ ok: 'ok' });
});

app.listen(3000, () => {
  console.log(`server is listen on port ${process.env.PORT}....`);
});
