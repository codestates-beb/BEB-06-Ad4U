const { Client, Advertisement, Advertisement_has_Supplier, Supplier } = require('../models/index');
const jwt = require('jsonwebtoken');

module.exports = {
    apply: async (req, res) => { //광고 지원 - supplier
        const authorization = req.headers.authorization;
        const { isClient, advertisement_id } = req.body;

        if (!authorization || isClient) {
            res.status(401).send({ data: null, message: 'invalid access' });
        }
        else {
            try {
                const token = authorization.split(' ')[1];
                const data = jwt.verify(token, process.env.ACCESS_SECRET);

                const user = await Supplier.findOne({
                    attributes: ['id'],
                    where: { userId: data.userId },
                });
                const body = {
                    Advertisement_id: advertisement_id,
                    Supplier_id: user.id
                }
                Advertisement_has_Supplier.create(body)
                    .then((data) => {
                        res.status(201).json("complete")
                    }).catch((err) => {
                        res.status(400).json(err)
                    })
            } catch (error) {
                res.status(400).json(err)
            }
        }
    },
    cancel: async (req, res) => { //광고 지원 취소 - supplier
        const authorization = req.headers.authorization;
        const { isClient, advertisement_id } = req.body;

        if (!authorization || isClient) {
            res.status(401).send({ data: null, message: 'invalid access' });
        }
        else {
            try {
                const token = authorization.split(' ')[1];
                const data = jwt.verify(token, process.env.ACCESS_SECRET);

                const user = await Supplier.findOne({
                    attributes: ['id'],
                    where: { userId: data.userId },
                });

                Advertisement_has_Supplier.destroy({
                    where: {
                        Advertisement_id: advertisement_id,
                        Supplier_id: user.id
                    },
                }).then((data) => {
                    res.status(201).json("complete")
                }).catch((err) => {
                    res.status(400).json("DB error")
                });

            } catch (error) {
                res.status(400).json(err)
            }
        }
    },
    conference: async (req, res) => {// 광고 협의 - client
        const authorization = req.headers.authorization;
        const { supplier_id, advertisement_id, isClient } = req.body;
        try {
            const token = authorization.split(' ')[1];
            const data = jwt.verify(token, process.env.ACCESS_SECRET);

            const user = await Client.findOne({
                attributes: ['id'],
                where: { userId: data.userId },
            });
            const ad = await Advertisement.findOne({
                attributes: ['Client_id'],
                where: { id: advertisement_id },
            })
            if (!authorization || !isClient || ad.Client_id != user.id) {
                res.status(401).send({ data: null, message: 'invalid access' });
            } else {
                Advertisement_has_Supplier.destroy({
                    where: {
                        Supplier_id: { [Op.ne]: supplier_id }
                    }
                }).then((data) => {
                    Advertisement.update({
                        status: 1
                    }, {
                        where: {
                            id: advertisement_id
                        }
                    })
                        .then((data) => {
                            res.status(201).json("complete")
                        }).catch((err) => {
                            res.status(400).json("DB error");
                        })
                }).catch((err) => {
                    res.status(400).json("DB error");
                })
            }
        } catch (error) {
            res.status(400).json(error);
        }
    },
    proceed: async (req, res) => { //광고 진행 - supplier
        const authorization = req.headers.authorization;
        const { isClient, advertisement_id } = req.body;
        try {
            const token = authorization.split(' ')[1];
            const data = jwt.verify(token, process.env.ACCESS_SECRET);

            const ad_info = await Advertisement.findOne({
                attributes: ['id'],
                where: { id: advertisement_id },
                include: [
                    {
                        model: Advertisement_has_Supplier, as: "Advertisement_has_Suppliers",
                        include: [
                            {
                                model: Supplier, as: "Supplier",
                                attributes: ['userId']
                            }
                        ]
                    },
                ]
            })

            if (!authorization || isClient || ad_info.Advertisement_has_Suppliers.Supplier.userId != data.userId) {
                res.status(401).send({ data: null, message: 'invalid access' });
            }
            else {
                Advertisement.update(
                    { status: 2 }, {
                    where: { id: advertisement_id }})
                    .then((data) => {
                        res.status(201).json("complete")
                    }).catch((err) => {
                        res.status(400).json("DB error")
                    })

            }
        } catch (error) {
            res.status(400).json(err)
        }
    }
}