require("dotenv").config();
const randomstring = require("randomstring");
const { pool } = require("./db/mysql");
const { KGS_KEY_THRESHOLD, KGS_CHECK_KEY_INTERVAL, KGS_GEN_KEY_NUM } = process.env;

const data = [];

setInterval(async () => {
  const keyCount = await keysCount();
  console.log("Not use keys:", keyCount);
  if (keyCount < KGS_KEY_THRESHOLD) {
    await insertData();
  }
}, KGS_CHECK_KEY_INTERVAL);

function generateFakeData() {
  for (let i = 0; i < KGS_GEN_KEY_NUM; i++) {
    const encode = randomstring.generate({
      length: 7,
      charset: "alphanumeric",
    });
    const isUse = false;
    // console.log(encode);
    data.push([encode, isUse]);
  }
  return data;
}

async function keysCount() {
  const sql = "SELECT count(*) as count FROM url_keys WHERE is_use = 0";
  try {
    const [query] = await pool.execute(sql);
    const count = query[0].count;
    return count;
  } catch (err) {
    console.log(err);
  }
}

async function insertData() {
  const sql = "INSERT IGNORE INTO url_keys (random_key, is_use) VALUES ?";
  const fakeDate = generateFakeData();
  //   console.log("fakeDate:", fakeDate);
  try {
    // console.log(poolKeyGen.format(sql, [fakeDate]));
    await pool.query(sql, [fakeDate]);
    console.log("Successful!!");
  } catch (err) {
    console.log(err);
  }
}
