const express = require('express');
const router = express.Router();
const db = require('../config/db');

// post 다 가져오기
// main에 뜨는 포스트와 다르게 보이기
// delete 문
// 관리자 페이지 안에서 -> post관리, user관리