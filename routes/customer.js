import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../db.js';
import { generateAccessToken, generateRefreshToken as generateRefreshToken, verifyToken } from '../auth.js';

const router = express.Router();
// 회원정보변경 PUT
// 127.0.0.1:8080/api/customer/update.do
// body = {"name": "변경할이름", "phone": "0000-9999-8888"}
// token은 헤더에서 보내줌 여기서 이메일은 추출함

router.put('/update.do', verifyToken, async (req, res) => {
    try {
        const { email } = req.customer;
        const { name, phone } = req.body;
        const sql = 'UPDATE customer SET name=?, phone=? WHERE email=?';
        const [result] = await pool.query(sql, [name, phone, email]);
        return res.send({ result: 1, status: 200 });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ err: err });
    }
});

// 로그인
// 127.0.0.1:8080/api/customer/login.do
// body = {"email": "t1@t1.com", "password": "a1"}

router.post('/login.do', async (req, res) => {
    try {
        const { email, password } = req.body;
        const sql = 'SELECT c.email, c.password, c.name FROM customer c WHERE email=?';
        const [result] = await pool.query(sql, [email]);
        console.log(result);
        if (result.length === 1) {
            if (await bcrypt.compare(password, result[0].password)) {
                const customer = { email: result[0].email, name: result[0].name };
                const accessToken = generateAccessToken(customer);
                const refreshToken = generateRefreshToken(customer);
                return res.send({ result: 1, accessToken: accessToken, refreshToken: refreshToken });
            }
        }
        return res.send({ result: 0 });
    }
    catch (err) {
        return res.status(500).send({ err: err })
    }
});

// 회원가입
// 127.0.0.1:8080/api/customer/join.do
// body = {"email": "t1@t1.com", "name": "가나다", "password": "a1", "phone": "010-1234-5678"}

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
});

export default router;