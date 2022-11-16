const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const port = 3001;

const usersRouter = require('./router/usersRouter');
const adRouter = require("./router/adRouter");
const supplierRouter = require("./router/supplierRouter");
const clientRouter = require("./router/clientRouter");

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/users', usersRouter);
app.use('/ad', adRouter);
app.use('/client', clientRouter);
app.use('/supplier', supplierRouter);



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
