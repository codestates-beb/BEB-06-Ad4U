const { Client, Advertisement, Advertisement_has_Supplier, Supplier } = require('../models/index');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

module.exports = {
    apply: async (req, res) => { //광고 지원 - supplier
        const authorization = req.headers.authorization;
        const { isClient, advertisement_id } = req.body;
        // || isClient 를 지워야만 제대로 작동한다!!
        if (!authorization) {
            res.status(401).send({ data: null, message: 'invalid access' });
        }
        else {
            try {
                const token = authorization.split(' ')[1];
                const data = jwt.verify(token, process.env.ACCESS_SECRET);

                const body = {
                    Advertisement_id: advertisement_id,
                    Supplier_id: data.user.id
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

        if (!authorization) {
            res.status(401).send({ data: null, message: 'invalid access' });
        }
        else {
            try {
                const token = authorization.split(' ')[1];
                const data = jwt.verify(token, process.env.ACCESS_SECRET);

                Advertisement_has_Supplier.destroy({
                    where: {
                        Advertisement_id: advertisement_id,
                        Supplier_id: data.user.id
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
        const { supplier_id, advertisement_id, multisigAddress ,isClient } = req.body;
        if(!authorization || !isClient){
            res.status(401).send({ data: null, message: 'invalid access' });
        }else{
            try {
                const token = authorization.split(' ')[1];
                const data = jwt.verify(token, process.env.ACCESS_SECRET);
    
                const ad = await Advertisement.findOne({
                    attributes: ['Client_id'],
                    where: { id: advertisement_id },
                })
                if (ad.Client_id != data.user.id) {
                    res.status(401).send({ data: null, message: 'invalid access' });
                } else {
                    console.log(1)
                    Advertisement_has_Supplier.destroy({
                        where: {
                            Supplier_id: {[Op.ne]: supplier_id },
                            Advertisement_id: advertisement_id
                        }
                    }).then((data) => {
                        console.log(2)
                        Advertisement.update({
                            status: 1,
                            multisigAddress: multisigAddress
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
        }
        
    },
    proceed: async (req, res) => { //광고 진행 - supplier
        const authorization = req.headers.authorization;
        const { isClient, advertisement_id } = req.body;
        if(!authorization || isClient ){
            res.status(401).send({ data: null, message: 'invalid access' });
        }else{
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
                                    attributes: ['id']
                                }
                            ]
                        },
                    ]
                })
                if (ad_info.Advertisement_has_Suppliers[0].Supplier.id != data.user.id) {
                    res.status(401).send({ data: null, message: 'invalid access' });
                }
                else {
                    console.log(1)
                    Advertisement.update(
                        { status: 2 }, {
                        where: { id: advertisement_id }
                        })
                        .then((data) => {
                            res.status(201).json("complete")
                        }).catch((err) => {
                            res.status(400).json("DB error")
                        })
    
                }
            } catch (error) {
                console.log("err")
                res.status(400).json(error)
            }
        }
        
    },
    contract: async (req, res) => { //광고 계약서 작성 - client
        const authorization = req.headers.authorization;
        const { advertisement_id, isClient, token_uri, token_id, token_address } = req.body;
        if(!authorization||!isClient){
            res.status(401).send({ data: null, message: 'invalid access' });
        }else{
            try {
                const token = authorization.split(' ')[1];
                const data = jwt.verify(token, process.env.ACCESS_SECRET);

                const ad = await Advertisement.findOne({
                    attributes: ['Client_id'],
                    where: { id: advertisement_id },
                })
    
                if (data.user.id != ad.Client_id) {
                    res.status(401).send({ data: null, message: 'invalid access' });
                } else {
                    Advertisement.update(
                        { status: 3 ,
                            token_uri: token_uri,
                            token_id: token_id,
                            token_address: token_address},
                        { where: { id: advertisement_id } })
                        .then((data) => {
                            res.status(201).json("complete")
                        }).catch((err) => {
                            res.status(400).json("DB error")
                        })

                    
                }
            } catch (err) {
                res.status(400).json(err);
            }
        }
    },
    complete: async (req, res) => { //광고 완료
        const authorization = req.headers.authorization;
        const { advertisement_id, isClient } = req.body;
        if (!authorization) {
            res.status(401).send({ data: null, message: 'invalid access' });
        } else {
            try {
                const token = authorization.split(' ')[1];
                const data = jwt.verify(token, process.env.ACCESS_SECRET);
                if (isClient) {
                    const ad = await Advertisement.findOne({
                        attributes: ['Client_id'],
                        where: { id: advertisement_id },
                    })

                    if (data.user.id != ad.Client_id) {
                        res.status(401).send({ data: null, message: 'invalid access' });
                    } else {
                        Advertisement.update(
                            { status: 4 }, {
                            where: { id: advertisement_id }
                        })
                            .then((data) => {
                                res.status(201).json("complete")
                            }).catch((err) => {
                                res.status(400).json("DB error")
                            })
                    }
                } else {
                    const ad = await Advertisement.findOne({
                        attributes: ['id'],
                        where: { id: advertisement_id },
                        include: [
                            {
                                model: Advertisement_has_Supplier, as: "Advertisement_has_Suppliers",
                                include: [
                                    {
                                        model: Supplier, as: "Supplier",
                                        attributes: ['id']
                                    }
                                ]
                            },
                        ]
                    })
                    if (data.user.id != ad.Advertisement_has_Suppliers[0].Supplier.id) {
                        res.status(401).send({ data: null, message: 'invalid access' });
                    } else {
                        Advertisement.update(
                            { status: 4 }, {
                            where: { id: advertisement_id }
                        })
                            .then((data) => {
                                res.status(201).json("complete")
                            }).catch((err) => {
                                res.status(400).json("DB error")
                            })
                    }
                }
            } catch (err) {
                res.status(400).json(err);
            }
        }
    },
    _break: async (req, res) => { //광고 파기
        const authorization = req.headers.authorization;
        const { advertisement_id, isClient } = req.body;
        if (!authorization) {
            res.status(401).send({ data: null, message: 'invalid access' });
        } else {
            try {
                const token = authorization.split(' ')[1];
                const data = jwt.verify(token, process.env.ACCESS_SECRET);
                if (isClient) {
                    const ad = await Advertisement.findOne({
                        attributes: ['Client_id'],
                        where: { id: advertisement_id },
                    })

                    if (data.user.id != ad.Client_id) {
                        res.status(401).send({ data: null, message: 'invalid access' });
                    } else {
                        Advertisement.update(
                            { status: 5 }, {
                            where: { id: advertisement_id }
                        })
                            .then((data) => {
                                res.status(201).json("complete")
                            }).catch((err) => {
                                res.status(400).json("DB error")
                            })
                    }
                } else {
                    const ad = await Advertisement.findOne({
                        attributes: ['id'],
                        where: { id: advertisement_id },
                        include: [
                            {
                                model: Advertisement_has_Supplier, as: "Advertisement_has_Suppliers",
                                include: [
                                    {
                                        model: Supplier, as: "Supplier",
                                        attributes: ['id']
                                    }
                                ]
                            },
                        ]
                    })
                    if (data.user.id != ad.Advertisement_has_Suppliers[0].Supplier.id) {
                        res.status(401).send({ data: null, message: 'invalid access' });
                    } else {
                        Advertisement.update(
                            { status: 5 }, {
                            where: { id: advertisement_id }
                        })
                            .then((data) => {
                                res.status(201).json("complete")
                            }).catch((err) => {
                                res.status(400).json("DB error")
                            })
                    }
                }
            } catch (err) {
                res.status(400).json(err);
            }
        }

    }
}