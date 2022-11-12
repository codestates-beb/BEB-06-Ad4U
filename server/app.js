const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const port = 3001;

const userRouter = require('./router/userRouter');
const adRouter = require("./router/adRouter");

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/users', userRouter);
app.use('/ad', adRouter);


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
