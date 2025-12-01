const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.delete('/delete/:title', async(req,res) => {
    const { title } = req.params;
    const { userId } = req.body;

    try {
        const [rows] = await db.query('select * from post where title = ?' , [title]);
        if(rows.length === 0){
            res.status(404).json({success: false, message: '존재하지않는 게시글입니다'});
        }

        const post = rows[0];

        if(post.id !== userId) {
            return res.status(403).json({success: false, message: "게시글 삭제 권한이 없습니다"});
        }

        await db.query('delete from post where title = ? ', [title]);

        res.json({success: true, message: "게시글이 삭제됐습니다"});
    } catch(err) {
        console.error(err);
        res.status(500).json({success: false, message: "게시글을 삭제할 수 없습니다."})
    }
});

router.patch('/edit/:title', async (req, res) => {
    const { title } = req.params;
    const { userId, newTitle, newContent } = req.body;

    try {
        // 게시글 존재 여부 확인
        const [rows] = await db.query('SELECT * FROM post WHERE title = ?', [title]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: '존재하지 않는 게시글입니다.' });
        }

        const post = rows[0];

        // 작성자 확인
        if (post.id !== userId) {
            return res.status(403).json({ success: false, message: '게시글 수정 권한이 없습니다.' });
        }

        // 업데이트 실행
        await db.query('UPDATE post SET title = ?, content = ? WHERE title = ?', [newTitle, newContent, title]);

        res.json({ success: true, message: '게시글이 수정되었습니다.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: '게시글을 수정할 수 없습니다.' });
    }
});


module.exports = router;