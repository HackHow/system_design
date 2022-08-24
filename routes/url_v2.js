require('dotenv').config();
const express = require('express');
const asyncHandler = require('express-async-handler');
const { KEY_NAME } = process.env;
const { redis } = require('../db/cache');
const db = require('../db/mysql');
const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { shortUrl } = req.body;
    const longUrl = await db.execute(
      `SELECT long_url FROM url_table WHERE short_url = ?`,
      shortUrl
    );
    res.status(200).json({ longUrl });
  })
);

router.post('/', async (req, res) => {
  const longUrl = req.body.longUrl;
  const shortUrl = await redis.spop(KEY_NAME);
  await db.execute(`insert into url_table(long_url, short_url) values (?, ?)`, [
    longUrl,
    shortUrl,
  ]);
  res.status(200).json({ shortUrl });
});

module.exports = router;
