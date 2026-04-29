import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/password_fixup.do', async (req, res) => {
    try {
        const sql = 'SELECT c.email, c.password FROM customer c WHERE password NOT LIKE "$2b$10$%"';
        const update_sql = 'UPDATE customer SET password=? WHERE email=?';
        const [result] = await pool.query(sql);
        for (const ep in result) {
            console.log(ep, result[ep].email, result[ep].password);
            const hashPassword = await bcrypt.hash(result[ep].password, 10);
            const [result2] = await pool.query(update_sql, [hashPassword, result[ep].email]);
            console.log(result2);
        }
        // if (result.length === 1) {
        //     console.log("이메일 일치");
        //     if (await bcrypt.compare(password, result[0].password)) {
        //         console.log("암호 일치");
        //         return res.send({ result: 1 });
        //     }
        // }
        return res.send({ result: 0 });
    }
    catch (err) {
        return res.status(500).send({ err: err })
    }
});

export default router;