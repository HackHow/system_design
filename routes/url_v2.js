require('dotenv').config();
const express = require('express');
const asyncHandler = require('express-async-handler');
const axios = require('axios');
const { pool_cluster } = require('../db/mysql');
const router = express.Router();
const { KGS_URL, REQ_KEY_NUM, THRESHOLD_RATIO } = process.env;
let keyBuffer = [];

const findAllShort = async () => {
  try {
    let rows = [];
    for (let dbNum = 0; dbNum < 3; dbNum++) {
      let row = await pool_cluster[dbNum].execute(
        'SELECT short_url AS short_url FROM url_table2 LIMIT 100'
      );
      rows = [...rows, ...row];
    }
    return rows;
  } catch (error) {
    return { 'finddall sql error': error };
  }
};
router.get(
  '/all',
  asyncHandler(async (req, res) => {
    const [urls] = await findAllShort();
    res.send({ urls });
  })
);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const { shortUrl } = req.query;
      const mod = shortUrl.slice(-1).charCodeAt(0) % 3;
      const [result] = await pool_cluster[mod].execute(
        `SELECT long_url FROM url_table2 WHERE short_url = ?`,
        [shortUrl]
      );
      if (!result.length) {
        res.status(200).json({ message: 'not found' });
      }
      res.status(200).json({ longUrl: result[0].long_url });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: 'sql error' });
    }
  })
);

setInterval(async () => {
  const threshold = REQ_KEY_NUM * THRESHOLD_RATIO;
  if (keyBuffer.length < threshold) {
    console.log('key remain in buffer: ', keyBuffer.length);
    const { data } = await axios.get(KGS_URL);
    keyBuffer = [...keyBuffer, ...data];
    console.log('key fill in buffer: ', keyBuffer.length);
  }
}, 1000);

router.post('/', async (req, res) => {
  try {
    const longUrl = req.body.longUrl;
    const shortUrl = keyBuffer.pop();
    const mod = shortUrl.slice(-1).charCodeAt(0) % 3;
    await pool_cluster[mod].execute(
      `insert into url_table2(long_url, short_url) values (?, ?)`,
      [longUrl, shortUrl]
    );
    res.status(200).json({ shortUrl });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'sql error' });
  }
});

module.exports = router;
