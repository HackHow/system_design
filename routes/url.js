const express = require('express');
const db = require('../db/mysql');
const md5 = require('md5');
const router = express.Router();

router.get('/', async (req, res) => {
  let { shortUrl } = req.query;
  // console.log('shortUrl: ', shortUrl);
  let [result] = await db.getLongUrl(shortUrl);
  // console.log('result: ', result);
  res.status(200).json({ data: result.long_url });
});

router.post('/', async (req, res) => {
  const longUrl = req.body.url;
  const findUrl = await db.findUrl(longUrl);
  if (!findUrl.error) {
    shortUrl = 'http://' + findUrl;
    res.status(200).json({ shortUrl: shortUrl });
  } else {
    res.status(200).json({ error: findUrl.error });
  }
});

module.exports = router;
