/* eslint-disable no-param-reassign */
const mysql = require('mysql2/promise');
require('dotenv').config();

const config = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: 'shortURL',
    waitForConnections: true,
    connectionLimit: process.env.DB_LIMIT,
    queueLimit: 10000,
  },
  db0: {
    host: process.env.DB0_HOST,
    port: process.env.DB0_PORT,
    user: process.env.DB0_USER,
    password: process.env.DB0_PWD,
    database: 'shortURL',
    waitForConnections: true,
    connectionLimit: process.env.DB_LIMIT,
    queueLimit: 10000,
  },
  db1: {
    host: process.env.DB1_HOST,
    port: process.env.DB1_PORT,
    user: process.env.DB1_USER,
    password: process.env.DB1_PWD,
    database: 'shortURL',
    waitForConnections: true,
    connectionLimit: process.env.DB_LIMIT,
    queueLimit: 10000,
  },
  db2: {
    host: process.env.DB2_HOST,
    port: process.env.DB2_PORT,
    user: process.env.DB2_USER,
    password: process.env.DB2_PWD,
    database: 'shortURL',
    waitForConnections: true,
    connectionLimit: process.env.DB_LIMIT,
    queueLimit: 10000,
  },
};
const pool = mysql.createPool(config.db);
const pool_cluster = [
  mysql.createPool(config.db0),
  mysql.createPool(config.db1),
  mysql.createPool(config.db2),
];

async function execute(sql, params) {
  // check array
  if (typeof params === 'object' && params[0]) {
    params = params.map((param) => String(param));
  }

  // check number
  if (typeof params === 'number') {
    params = String(params);
  }

  // check string
  if (typeof params === 'string') {
    params = [params];
  }

  const [results] = await pool.execute(sql, params);
  return results;
}

module.exports = { execute, pool, pool_cluster };
