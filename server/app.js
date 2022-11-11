const express = require('express');
const cors = require('cors');

const app = express();

const port = 3001;


const testRouter = require('./router/testRouter');

app.use(cors());
app.use(express.json());

app.use('/', testRouter);

app.use((req, res, next) => {
    res.status(404).send('Not Found!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        message: 'Internal Server Error',
        stacktrace: err.toString()
    });
});


app.listen(port, () => {
    console.log(`[RUN] Server... | http://localhost:${port}`);
});

module.exports = app;
