const express = require('express');
const { redis } = require('../db/cache');
const { KEY_NAME } = process.env;

const router = express.Router();

router.get('/', async (req, res) => {
  const key = await redis.spop(KEY_NAME);
  res.status(200).send(key);
});

module.exports = router;
