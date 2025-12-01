const express = require('express');
const router = express.Router();
const db = require('../config/db')

router.post('/' , async(req,res) => {
    // id, 제목, 내용, 보일 글
    const {id, title, content, post_text} = req.body;
    
    // 유효성체크
    if(!id || !title || !content || !post_text) {
        return res.status(400).send("모든 항목의 값을 입력해주세요");
    }

    // 글 개시 insert
    const sql = `
        insert into post (id, title, content, post_text) values (?,?,?,?)
    `;

    try {
        await db.query(sql, [id, title, content, post_text]);
        res.status(200).send("업로드 성공");
    } catch(err) {
        console.error(err);
        res.status(500).send("서버오류")
    }
});

router.post('/temporaily_save' , async(req,res) => {
    const {id,title,content} = req.body;
    try {
        await db.query(
            'insert into temporaily_post (id,title,content) values (?,?,?)',
            [id,title,content]
        );
        res.json({success: true})
    } catch(err) {
        console.error(err);
        res.status(500).json({success: false, message: '임시저장 실패'});
    }
})

router.get('/temporaily_list/:id' , async(req,res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('select * from temporaily_post where id = ? order by created_at desc' , [id]);
        res.json({success: true, data: rows});
    } catch(err) {
        console.error(err);
        res.status(500).json({success: false, message: '임시저장본 불러오기 실패'});
    }
});




module.exports = router;