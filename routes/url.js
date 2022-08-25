const express = require('express');
const db = require('../db/mysql');
const md5 = require('md5');
const router = express.Router();

router.get('/', async (req, res) => {
    let { shortUrl } = req.query;
    let result = await db.getLongUrl(shortUrl);
    if (!result.error) {
        res.status(200).json({ long_url: result });
    } else {
        res.status(400).json({ error: result.error });
    }
});

router.post('/', async (req, res) => {
    const longUrl = req.body.url;
    const findUrl = await db.findUrl(longUrl);
    if (!findUrl.error) {
        shortUrl = 'http://' + findUrl;
        res.status(200).json({ shortUrl: shortUrl });
    } else {
        res.status(400).json({ error: findUrl.error });
    }
});

module.exports = router;
