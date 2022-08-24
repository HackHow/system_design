const express = require('express');
const db = require('../db/mysql');
const md5 = require('md5');
const { getLongUrl } = require('../model/model_geturl');
const router = express.Router();

router.get('/', async (req, res) => {
  let { short_url } = req.query;
  // console.log('short_url: ', short_url);
  let [result] = await getLongUrl(short_url);
  // console.log('result: ', result);
  res.status(200).json({ data: result.long_url });
});

router.post('/', async (req, res) => {
  const longUrl = req.body.url;
  const findUrl = await db.findUrl(longUrl);
  // console.log('find', findUrl);
  // console.log(findUrl.error);
  if (findUrl.error) {
    const hash = md5(longUrl);
    // console.log('hash', hash);
    const short = hash.slice(0, 7);
    // console.log('short', short);
    const store = await db.store(longUrl, short);
    // console.log('store', store);
    const shortUrl = 'http://' + short;
    res.status(200).json({ shortUrl: shortUrl });
  } else {
    res.status(200).json({ shortUrl: findUrl });
  }
});

module.exports = router;
