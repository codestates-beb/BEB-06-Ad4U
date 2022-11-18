const { Client, Advertisement, Advertisement_has_Supplier, Supplier } = require('../models/index');
const jwt = require('jsonwebtoken');


module.exports = {
    main: async (req, res) => { //최근 10개만
        try {
            let main_ad = await Advertisement.findAll({
                attributes: ['id', 'title', 'AdimgUrl', 'cost', 'createdAt'],
                where: {
                    status: 0,
                },
                order: [['id', 'DESC']],
                limit: 10,
                // offset: 5,
            });
            res.status(200).json(main_ad);
        } catch (error) {
            res.status(400).json(error);
        }

    },
    list: async (req, res) => {
        try {
            let main_ad = await Advertisement.findAll({
                attributes: ['id', 'title', 'AdimgUrl', 'cost', 'createdAt'],

                where: {
                    status: 0,
                },
                order: [['id', 'DESC']],
                include: [
                    {
                        model: Client, as: "Client",
                        attributes: ['id', 'company_name', 'company_number', 'email'],
                    },
                ]
                //limit: 10,
                // offset: 5,
            });
            res.status(200).json(main_ad);
        } catch (error) {
            res.status(400).json(error);
        }

    },
    detail: async (req, res) => {
        try {
            let ad_datail = await Advertisement.findOne({
                attributes: ['id', 'title', 'content', 'AdimgUrl', 'cost', 'createdAt'],
                where: {
                    id: req.query.id
                },
                include: [
                    {
                        model: Client, as: "Client",
                        attributes: ['id', 'userId', 'company_name', 'company_number', 'email'],
                    },
                    {
                        model: Advertisement_has_Supplier, as: "Advertisement_has_Suppliers",
                        include: [
                            {
                                model: Supplier, as: "Supplier",
                                attributes: ['userId'],
                            }
                        ]
                    }

                ]
                //limit: 10,
                // offset: 5,
            });
            res.status(200).json(ad_datail);
        } catch (error) {
            res.status(400).json(error);
        }

    },
    create: async (req, res) => { //광고 생성 - client
        const authorization = req.headers.authorization;
        const { title, content, AdImgUrl, cost, isClient } = req.body;
        if (!authorization || !isClient) {
            res.status(401).send({ data: null, message: 'invalid access' });
        } else {
            try {
                const token = authorization.split(' ')[1];
                const data = jwt.verify(token, process.env.ACCESS_SECRET);

                const user = await Client.findOne({
                    attributes: ['id'],
                    where: { userId: data.userId },
                });

                const body = {
                    title: title,
                    content: content,
                    AdImgUrl: AdImgUrl,
                    cost: cost,
                    status: 0,
                    Client_id: user.id
                }
                Advertisement.create(body)
                    .then(data => {

                        res.status(201).json("complete");
                    }).catch(err => {

                        res.status(400).json("DB error");
                    });
            } catch (error) {
                res.status(400).json(error);
            }
        }
    },
    _delete: async (req, res) => { //광고 삭제 -client
        const authorization = req.headers.authorization;
        const { advertisement_id, isClient } = req.body;
        if(!authorization || !isClient){
            res.status(401).send({ data: null, message: 'invalid access' });
        }else{
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
            if (ad.Client_id != user.id) {
                res.status(401).send({ data: null, message: 'invalid access' });
            } else {
                        Advertisement_has_Supplier.destroy({
                            where: {
                                Advertisement_id: advertisement_id
                            }
                        }).then((data) => {
                            Advertisement.destroy({
                                where : {
                                    id: advertisement_id
                            }})
                            .then(data => {
                                res.status(201).json("complete");
                            }).catch(err => {
                                res.status(400).json("DB error");
                            });
                        }).catch((err)=> {
                            res.status(400).json("DB error");
                        })
            }
        } catch (error) {
            res.status(400).json(error);
        }
        }
        
    },
}