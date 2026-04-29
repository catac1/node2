import express from 'express';
import boardRouter from './routes/board.js';
import customerRouter from './routes/customer.js';

const app = express();
const port = 8080;
const host = '0.0.0.0';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/board', boardRouter);
app.use('/api/customer', customerRouter);

app.get('/', (erq, res) => {
    res.send({ result: 'Hello World!' });
});

app.listen(port, host, () => {
    console.log(`Example app listening on port ${host}:${port}`);
});


