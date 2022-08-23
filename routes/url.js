const express = require('express');
const db = require('../db/mysql');
const md5 = require('md5');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ data: 'data' });
});

router.post('/', async (req, res) => {
    const longUrl = req.body.url;
    // console.log('long', longUrl);
    const hash = md5(longUrl);
    // console.log('hash', hash);
    const short = hash.slice(0, 7);
    // console.log('short', short);
    const store = await db.store(longUrl, short);
    // console.log('store', store);
    const shortUrl = 'http://' + short;
    res.status(200).json({ shortUrl: shortUrl });
});

module.exports = router;
