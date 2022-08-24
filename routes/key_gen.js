const express = require("express");
const { pool } = require("../db/mysql");
const { SEND_KEY_NUM } = process.env;

const router = express.Router();

router.get("/", async (req, res) => {
  const connection = await pool.getConnection();
  console.log("START TRANSACTION");
  try {
    await connection.query("START TRANSACTION");
    const selectSql = "SELECT random_key FROM url_keys WHERE is_use = 0 limit ? FOR UPDATE";
    const updateSql =
      "UPDATE url_keys SET is_use = 1 WHERE random_key in (SELECT random_key FROM (SELECT random_key FROM url_keys WHERE is_use = 0 limit ?) as t)";
    const [encode] = await pool.execute(selectSql, [SEND_KEY_NUM]);
    const result = encode.map((item) => item.random_key);

    await pool.execute(updateSql, [SEND_KEY_NUM]);
    await connection.commit();
    console.log("TRANSACTION Success!!");
    res.send(result);
  } catch (err) {
    await connection.query("ROLLBACK");
    console.log(err);
  } finally {
    await connection.release();
  }
});

module.exports = router;
