const express = require('express');
const { redis } = require('../db/cache');
const { KEY_NAME, REQ_KEY_NUM } = process.env;
const dayjs = require('dayjs');

const router = express.Router();
const currTime = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss:SSS');

router.get('/', async (req, res) => {
  const key = await redis.spop(KEY_NAME, REQ_KEY_NUM);
  console.log('[', currTime, '] Receive get keys request!!');
  res.status(200).send(key);
});

module.exports = router;
