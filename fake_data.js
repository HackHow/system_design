require("dotenv").config();
const md5 = require("md5");
const randomstring = require("randomstring");
const { execute, pool } = require("./db/mysql");
const { KEY_THRESHOLD, CHECK_KEY_INTERVAL, IMPORT_COUNT_SECOND } = process.env;

const data = [];

setInterval(async () => {
  const keyCount = await keysCount();
  console.log("Not use keys:", keyCount);
  if (keyCount < KEY_THRESHOLD) {
    await insertData();
  }
}, CHECK_KEY_INTERVAL);

function generateFakeData() {
  for (let i = 0; i < IMPORT_COUNT_SECOND; i++) {
    const randomString = randomstring.generate({
      length: 7,
      charset: "alphanumeric",
    });
    const isUse = false;
    const encode = md5(randomString).slice(0, 7);

    data.push([encode, isUse]);
  }
  return data;
}

async function keysCount() {
  const sql = "SELECT count(*) as count FROM url_keys WHERE is_use = 0";
  try {
    const [query] = await execute(sql);
    const count = query.count;
    return count;
  } catch (err) {
    console.log(err);
  }
}

async function insertData() {
  const sql = "INSERT IGNORE INTO url_keys (md5_encode, is_use) VALUES ?";
  const fakeDate = generateFakeData();
  //   console.log("fakeDate:", fakeDate);
  try {
    // console.log(pool.format(sql, [fakeDate]));
    await pool.query(sql, [fakeDate]);
    console.log("Successful!!");
  } catch (err) {
    console.log(err);
  }
}
