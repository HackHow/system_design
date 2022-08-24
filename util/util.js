require('dotenv').config();
const axios = require('axios').default;
const { KEY_THRESHOLD, CHECK_KEY_INTERVAL, KEY_NAME, KGS_URL } = process.env;
const { redis } = require('../db/cache');

const checkKeyNum = async () => {
  const keyRemain = await redis.scard(KEY_NAME);
  return keyRemain;
};

const getKeysFromKGS = async () => {
  const keys = await axios.post(KGS_URL);
  return keys;
};

setInterval(async () => {
  const keyNum = await checkKeyNum();
  console.log(keyNum);
  if (keyNum < KEY_THRESHOLD) {
    const keys = await getKeysFromKGS();
    await redis.sadd(KEY_NAME, keys);
  }
}, CHECK_KEY_INTERVAL);

module.exports = { checkKeyNum };
