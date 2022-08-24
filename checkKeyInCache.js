require('dotenv').config();
const axios = require('axios');
const { KEY_THRESHOLD, KEY_NAME, KGS_URL } = process.env;
const { redis } = require('./db/cache');

const checkKeyNum = async () => {
  const keyRemain = await redis.scard(KEY_NAME);
  return keyRemain;
};

const getKeysFromKGS = async () => {
  console.log(KGS_URL);
  const { data } = await axios.get(KGS_URL);
  return data;
};

const keyNum = await checkKeyNum();
console.log('checkKeyNum in redis: ', keyNum);
if (keyNum < KEY_THRESHOLD) {
  const keys = await getKeysFromKGS();
  await redis.sadd(KEY_NAME, keys);
}
