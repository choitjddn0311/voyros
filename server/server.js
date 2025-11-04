import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const ports = 5000;

app.get('/api' , (req,res) => {
    res.json({message: "hello. 백엔드 테스트 중입니다."});
});

app.listen(ports, () => {
    console.log(`${ports}번 포트에서 백엔드 실행중입니다.`);
});