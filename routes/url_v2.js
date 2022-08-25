require('dotenv').config();
const express = require('express');
const asyncHandler = require('express-async-handler');
const axios = require('axios');
const { pool_cluster } = require('../db/mysql');
const router = express.Router();
const { KGS_URL, REQ_KEY_NUM, THRESHOLD_RATIO } = process.env;
let keyBuffer = [];

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { shortUrl } = req.body;
    const mod = shortUrl.slice(-1).charCodeAt(0) % 3;
    const [result] = await pool_cluster[mod].execute(
      `SELECT long_url FROM url_table2 WHERE short_url = ?`,
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
  const threshold = REQ_KEY_NUM * THRESHOLD_RATIO;
  if (keyBuffer.length < threshold) {
    const { data } = await axios.get(KGS_URL);
    keyBuffer = [...keyBuffer, ...data];
  }

  const shortUrl = keyBuffer.pop();
  const mod = shortUrl.slice(-1).charCodeAt(0) % 3;
  await pool_cluster[mod].execute(
    `insert into url_table2(long_url, short_url) values (?, ?)`,
    [longUrl, shortUrl]
  );
  res.status(200).json({ shortUrl });
});

module.exports = router;
