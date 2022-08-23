const { execute } = require('../db/mysql');

const getLongUrl = async (short_url) => {
  let result = await execute(
    'SELECT long_url AS long_url FROM url_table WHERE short_url = ?',
    [short_url]
  );
  return result;
};

module.exports = getLongUrl;
