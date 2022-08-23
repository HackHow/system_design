const { execute } = require('../db/mysql');

const getLongUrl = async (short_url) => {
  try {
    let result = await execute(
      'SELECT long_url AS long_url FROM url_table WHERE short_url = ?',
      [short_url]
    );
    return result;
  } catch (error) {
    console.log('model error: ', error);
    return { 'model error': error };
  }
};

module.exports = { getLongUrl };
