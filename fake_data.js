require('dotenv').config({ path: __dirname + '/.env' });
const randomstring = require('randomstring');
const dayjs = require('dayjs');
const { pool } = require('./db/mysql');
const { KGS_KEY_THRESHOLD, KGS_GEN_KEY_NUM, SEND_KEY_NUM } = process.env;

const data = [];

const genKeys = async () => {
  await keysGenerate();
  process.exit(0);
};

genKeys();

async function keysGenerate() {
  const currTime = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss:SSS');
  const keyCount = await keysCount();
  if (keyCount < KGS_KEY_THRESHOLD) {
    await insertData();
    console.log('Keys generate successful !!');
    console.log('[', currTime, '] So far not use keys:', keyCount + Number(SEND_KEY_NUM));
    console.log('------------------------');
  } else {
    console.log('[', currTime, '] So far not use keys:', keyCount);
    console.log('------------------------');
  }
}

function generateFakeData() {
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

async function insertData() {
  const sql = 'INSERT IGNORE INTO url_keys (random_key, is_use) VALUES ?';
  const fakeDate = generateFakeData();
  //   console.log("fakeDate:", fakeDate);
  try {
    // console.log(poolKeyGen.format(sql, [fakeDate]));
    await pool.query(sql, [fakeDate]);
    console.log('Insert data successful !!');
  } catch (err) {
    console.log(err);
  }
}

async function keysCount() {
  const sql = 'SELECT count(*) as count FROM url_keys WHERE is_use = 0';
  try {
    const [query] = await pool.execute(sql);
    const count = query[0].count;
    return count;
  } catch (err) {
    console.log(err);
  }
}
