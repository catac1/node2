import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// 회원가입
// 127.0.0.1:8080/api/customer/join.do
// body = {"email": "t1@t1.com", "name": "가나다", "password": "a1","phone": "010-1234-5678"}

router.post('/join.do', async (req, res) => {
    try {
        const { email, name, password, phone } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const sql = "insert into customer(email, name, password, phone) values(?, ?, ?, ?)";
        const [result] = await pool.query(sql, [email, name, hashPassword, phone]);
        console.log(result);
        return res.send({ result: result, status: 200 });
    }
    catch (err) {
        return res.status(500).send({ err: err });
    }
})

export default router;