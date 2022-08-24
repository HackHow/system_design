/* eslint-disable no-param-reassign */
const mysql = require('mysql2/promise');
require('dotenv').config();
const md5 = require('md5');

const config = {
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB,
        waitForConnections: true,
        connectionLimit: 100,
        // queueLimit: 0,
    },
};

const pool = mysql.createPool(config.db);

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
// let dbCount = 0;
// let transCount = 0;
const findUrl = async (longUrl) => {
    const conn = await pool.getConnection();
    try {
        await conn.query('START TRANSACTION');
        const findUrl = 'SELECT short_url from url_table WHERE long_url = ?';
        const find = await conn.execute(findUrl, [longUrl]);
        const short = find[0][0]?.short_url;
        // console.log('short', short);
        // console.log('trans', transCount++);
        // console.log('find', short);
        if (short === undefined) {
            // dbCount += 1;
            // console.log('insert', dbCount);
            // console.log('here');
            const hash = md5(longUrl);
            // console.log('hash', hash);
            const shortUrl = hash.slice(0, 7);
            // console.log('short', shortUrl);
            const insertUrl = 'INSERT INTO url_table(long_url, short_url) VALUES (?, ?)';
            const insert = await conn.execute(insertUrl, [longUrl, shortUrl]);
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

module.exports = { execute, pool, store, findUrl };
