import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// 물품 삭제 DELETE
// 127.0.0.1:8080/api/item/delete.do
// body => { "code": 16 }
// Cannot delete item because code is usesd as foreign key for purchase table
router.delete('/delete.do', async (req, res) => {
    try {
        const { code } = req.body;
        const sql = 'DELETE FROM item WHERE code=?';
        const [result] = await pool.query(sql, [code]);
        console.log(result);
        return res.send({ result: result, status: 200 });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ err: err });
    }
})

// 물품 변경 PUT
// 127.0.0.1:8080/api/item/update.do?code=1
// {"name":"KEKW", "price": 77, "detail":"bar", "qty": 101}

router.put('/update.do', async (req, res) => {
    try {
        const { code } = req.query;
        const { name, price, detail, qty } = req.body;
        const sql = 'UPDATE item SET name=?, price=?, detail=?, qty=? WHERE code=?';
        const [result] = await pool.query(sql, [name, price, detail, qty, code]);
        console.log(result);
        return res.send({ result: result, status: 200 });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ err: err });
    }
});

// 물품등록 POST
// 127.0.0.1:8080/api/item/insert.do
// {"name":"컴퓨터", "price": 10023, "detail":"설명", "qty": 200, "phone":"031-111-2222"}

router.post('/insert.do', async (req, res) => {
    try {
        const { name, price, detail, qty, phone } = req.body;
        const sql = 'INSERT INTO item ( name, price, detail, qty, phone) VALUES (?,?,?,?,?)';
        const [result] = await pool.query(sql, [name, price, detail, qty, phone]);
        console.log(result);
        return res.send({ result: result, status: 200 });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ err: err });
    }
})


export default router;