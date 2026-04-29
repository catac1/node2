import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import multer from 'multer';

const router = express.Router();

// 파일의 저장방식: DB추가시 메모리, 파일저장경로 설정
const storage = multer.memoryStorage();

// 업로드 설정
const upload = multer({
    storage: storage,
    limits: { filesize: 10 * 1024 * 1024 } // 10 MiB (Mebibyte)
});

// 물품이미지 등록
// 127.0.0.1:8080/api/itemimage/insert.do
// { "code": 16, "image": "파일첨부" }

router.post('/insert.do', upload.single("image"), async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);
        const data = [
            req.body.code,
            req.file.originalname,
            req.file.mimetype,
            req.file.size,
            req.file.buffer
        ];
        const sql = "INSERT INTO itemimage (code, imagename, imagetype, imagesize, imagedata) VALUES (?, ?, ?, ?, ?)";
        const [result] = await pool.query(sql, data);
        return res.send({ result: result });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ err: err });
    }
});

// <img src='주소' />
// 127.0.0.1:8080/api/itemimage/image.do?no=1

router.get('/image.do', async (req, res) => {
    try {
        const { no } = req.query;
        const sql = 'SELECT * FROM itemimage WHERE no=?';
        const [result] = await pool.query(sql, [no]);
        res.contentType(result[0].imagetype);
        return res.send(result[0].imagedata);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ result: 0 });
    }
})

export default router;