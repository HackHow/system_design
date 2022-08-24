require('dotenv').config({ path: __dirname + '/.env' });
const randomstring = require('randomstring');
const dayjs = require('dayjs');
const { pool } = require('./db/mysql');
const { KGS_KEY_THRESHOLD, KGS_GEN_KEY_NUM, SEND_KEY_NUM } = process.env;

const data = [];

const genKeys = async () => {
  await generateKeys();
  process.exit(0);
};

genKeys();

async function generateKeys() {
  const currTime = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss:SSS');
  const keyCount = await calcKeysCount();
  if (keyCount < KGS_KEY_THRESHOLD) {
    await insertKeys();
    console.log('[', currTime, ']');
    console.log('Keys generate successful !! So far not use keys:', keyCount + Number(KGS_GEN_KEY_NUM));
    console.log('------------------------');
  } else {
    console.log('[', currTime, '] So far not use keys:', keyCount);
    console.log('------------------------');
  }
}

function generateFakeKeys() {
  for (let i = 0; i < KGS_GEN_KEY_NUM; i++) {
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
