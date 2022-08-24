/* eslint-disable no-param-reassign */
const mysql = require('mysql2/promise');
require('dotenv').config();
const base62 = require('base62/lib/ascii');
const md5 = require('md5');

const config = {
    db_0: {
        host: process.env.DB0_HOST,
        port: process.env.DB0_PORT,
        user: process.env.DB0_USER,
        password: process.env.DB0_PWD,
        database: process.env.DB,
        waitForConnections: true,
        connectionLimit: 100,
        // queueLimit: 0,
    },
    db_1: {
        host: process.env.DB1_HOST,
        port: process.env.DB1_PORT,
        user: process.env.DB1_USER,
        password: process.env.DB1_PWD,
        database: process.env.DB,
        waitForConnections: true,
        connectionLimit: 100,
        // queueLimit: 0,
    },
    db_2: {
        host: process.env.DB2_HOST,
        port: process.env.DB2_PORT,
        user: process.env.DB2_USER,
        password: process.env.DB2_PWD,
        database: process.env.DB,
        waitForConnections: true,
        connectionLimit: 100,
        // queueLimit: 0,
    },
};

const pool = [];
pool[0] = mysql.createPool(config.db_0);
pool[1] = mysql.createPool(config.db_1);
pool[2] = mysql.createPool(config.db_2);

// async function execute(sql, params) {
//   // check array
//   if (typeof params === 'object' && params[0]) {
//     params = params.map((param) => String(param));
//   }

//   // check number
//   if (typeof params === 'number') {
//     params = String(params);
//   }

//   // check string
//   if (typeof params === 'string') {
//     params = [params];
//   }

//   const [results] = await pool.execute(sql, params);
//   return results;
// }

const store = async (longUrl, shortUrl) => {
    try {
        const insertUrl = 'INSERT INTO url_table(long_url, short_url) VALUES (?, ?)';
        const insert = await pool.execute(insertUrl, [longUrl, shortUrl]);
        // console.log('insert', insert);
        return 'ok';
    } catch (err) {
        return err;
    }
};

const dbStorage = 1000000;
const findUrl = async (longUrl) => {
    const lastChar = longUrl.slice(-1);
    const dbNum = lastChar.charCodeAt(0) % 3;

    let conn = await pool[dbNum].getConnection();

    try {
        await conn.query('START TRANSACTION');
        const findUrl = 'SELECT short_url from url_table WHERE long_url = ?';
        const find = await conn.execute(findUrl, [longUrl]);
        const short = find[0][0]?.short_url;
        if (short === undefined) {
            const insertUrl = 'INSERT INTO url_table(long_url) VALUES(?)';
            const insert = await conn.execute(insertUrl, [longUrl]);
            const id = insert[0].insertId;
            // console.log('insert', id);
            const dbId = dbNum * dbStorage + id;
            // console.log('dbid', dbId);
            const trans = base62.encode(`${dbId}`);
            let addZero = '0';
            for (let i = 0; i < 6 - trans.length; i++) {
                addZero += '0';
            }
            const shortUrl = addZero + trans;
            // console.log('shortUrl', shortUrl);
            const storeUrl = 'UPDATE url_table SET short_url = ? WHERE id = ?';
            const store = await conn.execute(storeUrl, [shortUrl, id]);
            await conn.commit();
            return shortUrl;
        }
        await conn.commit();
        return short;
    } catch (err) {
        await conn.commit();
        await conn.query('ROLLBACK');
        return {
            error: err,
            status: 400,
        };
    } finally {
        await conn.release();
    }
};

const getLongUrl = async (shortUrl) => {
    const lastChar = shortUrl.slice(-1);
    const dbNum = lastChar.charCodeAt(0) % 3;
    // console.log(dbNum);
    try {
        let [result] = await pool[dbNum].execute('SELECT long_url AS long_url FROM url_table WHERE short_url = ?', [
            shortUrl,
        ]);
        return result;
    } catch (error) {
        console.log('model error: ', error);
        return { 'model error': error };
    }
};

module.exports = { pool, store, findUrl, getLongUrl };
