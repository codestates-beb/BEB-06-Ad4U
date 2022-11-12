const { Client, Advertisement } = require('../models/index');
const jwt = require('jsonwebtoken');


module.exports = {

    findAll: (req, res) => {
        res.send("1");
    },
    render: (req, res) => {

    },
    create: async (req, res) => {
        const authorization = req.headers.authorization;
        const { title, content, AdImgBuf, cost } = req.body;
        if (!authorization) {
            res.status(404).send({ data: null, message: 'invalid access token' });
        } else {
            try {
                const token = authorization.split(' ')[1];
                const data = jwt.verify(token, process.env.ACCESS_SECRET);

                user = await Client.findOne({
                    attributes: ['id'],
                    where: { userId: data.userId },
                });

                const body = {
                    title: title,
                    content: content,
                    AdImgBuf: AdImgBuf,
                    cost: cost,
                    status: 0,
                    Client_id: user.id
                }
                Advertisement.create(body)
                    .then(data => {

                        res.status(201).json(data);
                    }).catch(err => {

                        res.status(401).json(err)
                    });
            } catch (error) {
                res.status(401).json(error);
            }
        }
    }
}


// multisigAddress
// token_uri
// token_id
// token_address

