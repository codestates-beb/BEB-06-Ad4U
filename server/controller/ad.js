const { Client, Advertisement, Advertisement_has_Supplier, Supplier } = require('../models/index');


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
        } catch (err) {
            res.status(400).json(err.message);
        }

    },
    list: async (req, res) => {
        try {
            let list_ad = await Advertisement.findAll({
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
            list_ad.forEach((el) => {
                el.dataValues.company_name = el.Client.company_name;
            });

            res.status(200).json(list_ad);
        } catch (err) {
            res.status(400).json(err.message);
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
        } catch (err) {
            res.status(400).json(err.message);
        }

    },
    create: async (req, res) => { //광고 생성 - client
        const { title, content, AdImgUrl, cost } = req.body;
        try {
            const body = {
                title: title,
                content: content,
                AdImgUrl: AdImgUrl,
                cost: cost,
                status: 0,
                Client_id: req.data.user.id
            }
            Advertisement.create(body)
                .then(data => {
                    res.status(201).json("complete");
                })
        } catch (err) {
            res.status(400).json(err.message);
        }
    },
    _delete: async (req, res) => { //광고 삭제 -client
        const { advertisement_id } = req.body;

        try {
            const ad = await Advertisement.findOne({
                attributes: ['Client_id'],
                where: { id: advertisement_id },
            })
            if (ad.Client_id != req.data.user.id) {
                res.status(401).json('invalid access');
            } else {
                await Advertisement_has_Supplier.destroy({
                    where: {
                        Advertisement_id: advertisement_id
                    }
                });
                await Advertisement.destroy({
                    where: {
                        id: advertisement_id
                    }
                });
                res.status(200).json("complete")
            }
        } catch (err) {
            res.status(400).json(err.message);
        }
    },
    allContract: async (req, res) => {
        try {
            let list_contract = await Advertisement.findAll({
                attributes: ['multisigAddress'],
            });
            const filter_contract = list_contract.filter((ele) => {
                return ele.dataValues.multisigAddress != null;
            })
            res.status(200).json(filter_contract);
        } catch (err) {
            res.status(400).json(err.message);
        }

    },
}