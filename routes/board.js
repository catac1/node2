import express from 'express';
import pool from '../db.js';

const router = express.Router();


//url => POST 127.0.0.1:8080/api/board/insert.json
//body => {"title": "제목", "content": "내용", "writer": "글쓴이" }
router.post('/insert.json', async (req, res) => {
    //json or send both are good
    console.log(req.body);
    return res.json({ result: 'ok' });
});

export default router;