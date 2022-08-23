const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ data: 'data' });
});

router.post('/', (req, res) => {
  res.status(200).json({ data: 'data' });
});

module.exports = router;
