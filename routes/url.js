const express = require('express');
const { getLongUrl } = require('../model/model_geturl');

const router = express.Router();

router.get('/', async (req, res) => {
  let { short_url } = req.query;
  console.log('short_url: ', short_url);
  let [result] = await getLongUrl(short_url);
  console.log('result: ', result);
  res.status(200).json({ data: result.long_url });
});

router.post('/', (req, res) => {
  res.status(200).json({ data: 'data' });
});

module.exports = router;
