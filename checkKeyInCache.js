require('dotenv').config({ path: __dirname + '/.env' });
const { KEY_NAME, SEND_KEY_TO_REDIS, THRESHOLD_RATIO } = process.env;
const { pool } = require('./db/mysql');
const { redis } = require('./db/cache');
const dayjs = require('dayjs');

const checkKeyNum = async () => {
  const keyRemain = await redis.scard(KEY_NAME);
  return keyRemain;
};

const main = async () => {
  const keyNum = await checkKeyNum();
  const currTime = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss:SSS');
  console.log('[', currTime, ']');
  const threshold = Number(SEND_KEY_TO_REDIS) * Number(THRESHOLD_RATIO);
  if (keyNum < threshold) {
    console.log(
      'The number of keys is less than the threshold, so we need to insert keys to redis'
    );
    await insertKeysToCache();
    console.log(
      'The number of keys in redis so far:',
      keyNum + Number(SEND_KEY_TO_REDIS)
    );
    console.log('---------------------');
  } else {
    console.log('The number of keys is still enough in redis:', keyNum);
    console.log('---------------------');
  }
  process.exit(0);
};

main();

async function insertKeysToCache() {
  const connection = await pool.getConnection();
  console.log('START TRANSACTION');
  try {
    await connection.query('START TRANSACTION');
    const selectSql =
      'SELECT random_key FROM url_keys WHERE is_use = 0 limit ? FOR UPDATE';
    const updateSql =
      'UPDATE url_keys SET is_use = 1 WHERE random_key in (SELECT random_key FROM (SELECT random_key FROM url_keys WHERE is_use = 0 limit ?) as t)';
    const [encode] = await pool.execute(selectSql, [SEND_KEY_TO_REDIS]);
    const result = encode.map((item) => item.random_key);
    // add keys to redis
    await redis.sadd(KEY_NAME, result);

    await pool.execute(updateSql, [SEND_KEY_TO_REDIS]);
    await connection.commit();

    console.log('TRANSACTION SUCCESS !!');
  } catch (err) {
    await connection.query('ROLLBACK');
    console.log('TRANSACTION FAILED !!');
    console.log(err);
    console.log('---------------------');
  } finally {
    await connection.release();
  }
}
