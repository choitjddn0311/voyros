const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 블로그 포스트 목록 조회
router.get('/post', (req, res) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

module.exports = router;