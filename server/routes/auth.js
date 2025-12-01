const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../config/db');

// 회원가입 라우터
router.post('/signup' , async (req,res) => {
    // id, name, pw 받아옴
    const {id, name, pw, email, birthday, gender} = req.body;

    try {
        // id를 select로 가져온 후 아이디 중복체크
        const [row] = await db.query('select * from user where id = ?' , [id]);
        if(row.length > 0) {
            return res.status(400).json({success: false, message: '사용할 수 없는 아이디입니다.'});
        }

        const hashedPw = await bcrypt.hash(pw, 10); //salt 10자리

        // 회원가입 insert query
        await db.query('insert into user (id, name, pw, email, birthday, gender) value(?,?,?,?,?,?)' , [id,name,hashedPw,email || null, birthday || null, gender || null]);
        res.json({success: true, message: '회원가입되었습니다!'});
    } catch (err) {
        console.error(err);
        res.status(500).json({success: false, message: '서버오류'});
    }
});

// 로그인 라우터 
router.post('/login', async (req, res) => {
  const { id, pw } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM user WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: '존재하지않는 아이디입니다.' });
    }

    const user = rows[0];

    if (!user.pw) {
      return res.status(500).json({ success: false, message: '비밀번호 정보가 없습니다.' });
    }

    const pwMatch = await bcrypt.compare(pw, user.pw);
    if (!pwMatch) {
      return res.status(401).json({ success: false, message: '비밀번호가 틀렸습니다.' });
    }

    res.json({ success: true, message: '로그인되었습니다', id: user.id, name: user.name, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: '서버오류' });
  }
});


// id 체크 라우터
router.post('/check-id', async (req, res) => {
  const { id } = req.body;

  try {
    // 아이디 존재여부
    const [rows] = await db.query('SELECT * FROM user WHERE id = ?', [id]);
    if (rows.length > 0) {
      return res.json({ available: false }); // 이미 존재
    }
    res.json({ available: true }); // 사용 가능
  } catch (err) {
    console.error(err);
    res.status(500).json({ available: false, message: '서버 오류' });
  }
});


module.exports = router;

