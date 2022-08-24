require('dotenv').config();
const express = require('express');
const asyncHandler = require('express-async-handler');
const axios = require('axios');
const { pool } = require('../db/mysql');
const router = express.Router();
const { KGS_URL } = process.env;

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { shortUrl } = req.body;
    const mod = shortUrl.slice(-1).charCodeAt(0) % 3;
    const [result] = await pool[mod].execute(
      `SELECT long_url FROM url_table WHERE short_url = ?`,
      [shortUrl]
    );
    if (!result.length) {
      res.status(200).json({ message: 'not found' });
    }
    res.status(200).json({ longUrl: result[0].long_url });
  })
);

router.post('/', async (req, res) => {
  const longUrl = req.body.longUrl;
  const { data } = await axios.get(KGS_URL);
  const shortUrl = data;
  const mod = shortUrl.slice(-1).charCodeAt(0) % 3;
  await pool[mod].execute(
    `insert into url_table(long_url, short_url) values (?, ?)`,
    [longUrl, shortUrl]
  );
  res.status(200).json({ shortUrl });
});

module.exports = router;
