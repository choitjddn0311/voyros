const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
    const { sort, user } = req.query;

    try {
        let sql = 'SELECT * FROM post';
        const values = [];

        if (user) {
            sql += ' WHERE id = ? order by created_at desc';
            values.push(user);
        }

        if (sort === 'desc') {
            sql += user ? ' ORDER BY created_at DESC' : ' ORDER BY created_at DESC';
        }

        const [rows] = await db.query(sql, values);
        res.json(rows);
    } catch (err) {
        console.error("게시물 불러오기 실패", err);
        res.status(500).json({ message: '서버 오류' });
    }
});

router.get('/title/:title', async (req, res) => {
    const { title } = req.params;
    try {
        const [rows] = await db.query(
            'SELECT p.id, u.name, p.title, p.content, p.created_at FROM post p JOIN user u ON p.id = u.id WHERE p.title = ?',
            [title]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: '그런 제목의 게시물 없당께요~' });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error("제목으로 게시물 불러오기 실패", err);
        res.status(500).json({ message: '서버 에러요~ 다음에 다시 해보랑께' });
    }
});

module.exports = router;
