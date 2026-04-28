import express from 'express';

const router = express.Router();

// 127.0.0.1:8080/api/board/insert.json
router.get('/insert.json', async (req, res) => {
    // return res.json({ result: 'ok' }); json or send both are good
    return res.send({ result: 'ok' });
});

export default router;