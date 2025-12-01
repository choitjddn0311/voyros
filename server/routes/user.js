const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.delete('/' , async(req,res) => {
    const {id} = req.body;
    console.log(req.body);
    try {
        const [rows] = await db.query('delete from user where id = ?' , [id]);
        if(rows.affectedRows > 0) {
            return res.json({success: true})
        } else {
            return res.json({success: false, message: '유저를 찾을 수 없습니다'});
        }
    } catch(err) {
        console.error(err)
        return res.status(500).json({success: false, meesage: '오류 발생'});
    }
});

module.exports = router;
