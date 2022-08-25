require('dotenv').config({ path: __dirname + '/.env' });
const randomstring = require('randomstring');
const dayjs = require('dayjs');
const { pool } = require('./db/mysql');
const { GEN_KEY_TO_DB, THRESHOLD_RATIO } = process.env;

const data = [];

const genKeys = async () => {
  await generateKeys();
  process.exit(0);
};

genKeys();

async function generateKeys() {
  const currTime = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss:SSS');
  const keyCount = await calcKeysCount();
  const threshold = Number(GEN_KEY_TO_DB) * Number(THRESHOLD_RATIO);
  if (keyCount < threshold) {
    await insertKeys();
    console.log(
      '[',
      currTime,
      '] Keys generate successful!! So far not use keys:',
      keyCount + Number(GEN_KEY_TO_DB)
    );
    console.log('------------------------');
  } else {
    console.log('[', currTime, '] So far not use keys:', keyCount);
    console.log('------------------------');
  }
}

function generateFakeKeys() {
  for (let i = 0; i < GEN_KEY_TO_DB; i++) {
    const encode = randomstring.generate({
      length: 7,
      charset: 'alphanumeric',
    });
    const isUse = false;
    // console.log(encode);
    data.push([encode, isUse]);
  }
  return data;
}

async function insertKeys() {
  const sql = 'INSERT IGNORE INTO url_keys (random_key, is_use) VALUES ?';
  const fakeDate = generateFakeKeys();
  //   console.log("fakeDate:", fakeDate);
  try {
    // console.log(poolKeyGen.format(sql, [fakeDate]));
    await pool.query(sql, [fakeDate]);
  } catch (err) {
    console.log(err);
    console.log('------------------------');
  }
}

async function calcKeysCount() {
  const sql = 'SELECT count(*) as count FROM url_keys WHERE is_use = 0';
  try {
    const [query] = await pool.execute(sql);
    const count = query[0].count;
    return count;
  } catch (err) {
    console.log(err);
  }
}
