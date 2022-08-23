const express = require('express');
const { getLongUrl } = require('../model/model_geturl');

const router = express.Router();

router.get('/:url', (req, res) => {
  let { url } = req.query;
  let result = getLongUrl(url);
  res.status(200).json({ data: result });
});

router.post('/', (req, res) => {
  res.status(200).json({ data: 'data' });
});

module.exports = router;
