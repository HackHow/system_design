const express = require('express');
const { redis } = require('../db/cache');
const { KEY_NAME, REQ_KEY_NUM } = process.env;

const router = express.Router();

router.get('/', async (req, res) => {
  const key = await redis.spop(KEY_NAME, REQ_KEY_NUM);
  res.status(200).send(key);
});

module.exports = router;
