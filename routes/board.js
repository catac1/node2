import express from 'express';
import pool from '../db.js';
const router = express.Router();

// url => DELETE 127.0.0.1:8080/api/board/deleteone.json
// body => {"no": 5}
router.delete('/deleteone.json', async (req, res) => {
    try {
        const { no } = req.body;
        const sql = 'delete from board where no=?';
        const [result] = await pool.query(sql, [no]);
        console.log(result);
        return res.send({ result: result });
    }
    catch (err) {
        return res.status(500).send({ err: err });
    }
});

// url => PUT 127.0.0.1:8080/api/board/updateone.json?no=5
// body => {"title": "제목변경", "content": "내용변경", "writer": "변경자"}
router.put('/updateone.json', async (req, res) => {
    try {
        const { no } = req.query;
        const { title, content, writer } = req.body;
        const sql = 'update board set title=?, content=?, writer=? where no=?';
        const [result] = await pool.query(sql, [title, content, writer, no]);
        console.log(result);
        return res.send({ result: result });
    }
    catch (err) {
        return res.status(500).send({ err: err });
    }
});

// url => GET 127.0.0.1:8080/api/board/selectlist.json
router.get('/selectlist.json', async (req, res) => {
    try {
        const sql = 'select b.* from board b';
        const [result] = await pool.query(sql);
        console.log("selectlist", result);
        return res.send({ result: result });
    }
    catch (err) {
        console.log(err);
        return res.send({ err: err });
    }
});

// url => POST 127.0.0.1:8080/api/board/insert.json
// body => {"title": "제목", "content": "내용", "writer": "글쓴이" }
router.post('/insert.json', async (req, res) => {
    //json or send both are good
    try {
        const { title, content, writer } = req.body;
        const sql = 'insert into board (title, content, writer) values (?, ?, ?)';
        const result = await pool.query(sql, [title, content, writer]);
        console.log(result);
        return res.json({ result: result[0] });
    }
    catch (err) {
        return res.send({ err: err });
    }
});

export default router;