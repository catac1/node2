import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/password_reset.do', async (req, res) => {
    try {
        const { email, password } = req.body;
        const sql = 'UPDATE customer SET password=? WHERE email=?';
        const hashPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(sql, [hashPassword, email]);
        console.log(result);
        return res.send({ result: 0 });
    }
    catch (err) {
        return res.status(500).send({ err: err })
    }
});

export default router;