import express from 'express';
// import router from './routes/board';


const app = express();
const port = 8080;

import boardRouter from './routes/board.js';
app.use('/api/board', boardRouter);

app.get('/', (erq, res) => {
    res.send({ result: 'Hello World!' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


