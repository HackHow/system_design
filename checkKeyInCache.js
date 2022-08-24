require('dotenv').config({ path: __dirname + '/.env' });
const { KEY_NAME, KEY_THRESHOLD, SEND_KEY_NUM } = process.env;
const { pool } = require('./db/mysql');
const { redis } = require('./db/cache');

const checkKeyNum = async () => {
  const keyRemain = await redis.scard(KEY_NAME);
  console.log('Keys number in redis:', keyRemain);
  return keyRemain;
};

const main = async () => {
  const keyNum = await checkKeyNum();
  if (keyNum < KEY_THRESHOLD) {
    console.log('Insert keys to redis');
    await insertCache();
  } else {
    console.log('Keys are still enough in redis');
  }
  process.exit(0);
};

main();

async function insertCache() {
  const connection = await pool.getConnection();
  console.log('START TRANSACTION');
  try {
    await connection.query('START TRANSACTION');
    const selectSql = 'SELECT random_key FROM url_keys WHERE is_use = 0 limit ? FOR UPDATE';
    const updateSql =
      'UPDATE url_keys SET is_use = 1 WHERE random_key in (SELECT random_key FROM (SELECT random_key FROM url_keys WHERE is_use = 0 limit ?) as t)';
    const [encode] = await pool.execute(selectSql, [SEND_KEY_NUM]);
    const result = encode.map((item) => item.random_key);
    // redis
    await redis.sadd(KEY_NAME, result);

    await pool.execute(updateSql, [SEND_KEY_NUM]);
    await connection.commit();

    console.log('TRANSACTION Success!!');
  } catch (err) {
    await connection.query('ROLLBACK');
    console.log(err);
  } finally {
    await connection.release();
  }
}
