import express from 'express';
import boardRouter from './routes/board.js';
import customerRouter from './routes/customer.js';
import itemRouter from './routes/item.js';
import itemimageRouter from './routes/itemimage.js';
// import password_fixup from './routes/password_fixup.js';
import password_reset from './routes/password_reset.js';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.join(__dirname, './build');

const app = express();
const port = 8080;
const host = '0.0.0.0';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(buildPath));

app.use('/api/board', boardRouter);
app.use('/api/customer', customerRouter);
app.use('/api/item', itemRouter);
app.use('/api/itemimage', itemimageRouter);
// app.use('/api/customer', password_fixup);
// app.use('/api/customer', pimageasswordimage_fixup);
app.use('/api/customer', password_reset);
app.use('/api/admin', password_reset);

app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
        return next();
    }
    res.sendFile(path.join(buildPath, 'index.html'));
})


app.get('/', (req, res) => {
    res.send({ result: 'Hello World!' });
});

app.listen(port, host, () => {
    console.log(`Example app listening on port ${host}:${port}`);
});


