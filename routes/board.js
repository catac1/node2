import express from 'express';
import pool from '../db.js';

const router = express.Router();


//url => POST 127.0.0.1:8080/api/board/insert.json
//body => {"title": "제목", "content": "내용", "writer": "글쓴이" }
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