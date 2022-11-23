const { Advertisement, Advertisement_has_Supplier, Supplier } = require('../models/index');
const { Op } = require('sequelize');

module.exports = {
    apply: async (req, res) => { //광고 지원 - supplier
        const { advertisement_id } = req.body;

        const body = {
            Advertisement_id: advertisement_id,
            Supplier_id: req.data.user.id
        }
        Advertisement_has_Supplier.create(body)
            .then((data) => {
                res.status(201).json("complete")
            }).catch((err) => {
                res.status(400).json(err.message)
            });
    },
    cancel: async (req, res) => { //광고 지원 취소 - supplier
        const { advertisement_id } = req.body;

        Advertisement_has_Supplier.destroy({
            where: {
                Advertisement_id: advertisement_id,
                Supplier_id: req.data.user.id
            },
        }).then((data) => {
            res.status(201).json("complete")
        }).catch((err) => {
            res.status(400).json(err.message)
        });

    },
    conference: async (req, res) => {// 광고 협의 - client
        const { supplier_id, advertisement_id, multisigAddress } = req.body;
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
                        Supplier_id: { [Op.ne]: supplier_id },
                        Advertisement_id: advertisement_id
                    }
                });
                await Advertisement.update({
                    status: 1,
                    multisigAddress: multisigAddress
                }, {
                    where: {
                        id: advertisement_id
                    }
                });
                res.status(201).json("complete");
            }
        } catch (err) {
            res.status(400).json(err.message);
        }

    },
    proceed: async (req, res) => { //광고 진행 - supplier
        const { advertisement_id } = req.body;
            try {
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
                if (ad_info.Advertisement_has_Suppliers[0].Supplier.id != req.data.user.id) {
                    res.status(401).json('invalid access');
                }
                else {
                    Advertisement.update(
                        { status: 2 }, {
                        where: { id: advertisement_id }
                        }).then((data) => {
                            res.status(201).json("complete")
                        })
                }
            } catch (err) {
                res.status(400).json(err.message)
            }

    },
    contract: async (req, res) => { //광고 계약서 작성 - client

        const { advertisement_id, token_uri, token_id, token_address } = req.body;
            try {
                const ad = await Advertisement.findOne({
                    attributes: ['Client_id'],
                    where: { id: advertisement_id },
                })

                if (req.data.user.id != ad.Client_id) {
                    res.status(401).json('invalid access');
                } else {
                    Advertisement.update(
                        {
                            status: 3,
                            token_uri: token_uri,
                            token_id: token_id,
                            token_address: token_address
                        },
                        { where: { id: advertisement_id } })
                        .then((data) => {
                            res.status(201).json("complete")
                        })
                }
            } catch (err) {
                res.status(400).json(err.message);
            
        }
    },
    complete: async (req, res) => { //광고 완료
        const { advertisement_id, isClient } = req.body;
            try {
                if (isClient) {
                    const ad = await Advertisement.findOne({
                        attributes: ['Client_id'],
                        where: { id: advertisement_id },
                    })

                    if (req.data.user.id != ad.Client_id) {
                        res.status(401).json('invalid access');
                    } else {
                        Advertisement.update(
                            { status: 4 }, {
                            where: { id: advertisement_id }
                            }).then((data) => {
                                res.status(201).json("complete")
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
                    if (req.data.user.id != ad.Advertisement_has_Suppliers[0].Supplier.id) {
                        res.status(401).json('invalid access');
                    } else {
                        Advertisement.update(
                            { status: 4 }, {
                            where: { id: advertisement_id }
                            }).then((data) => {
                                res.status(201).json("complete")
                            })
                    }
                }
            } catch (err) {
                res.status(400).json(err.message);
            
        }
    },
    _break: async (req, res) => { //광고 파기
        const { advertisement_id, isClient } = req.body;
            try {
                if (isClient) {
                    const ad = await Advertisement.findOne({
                        attributes: ['Client_id'],
                        where: { id: advertisement_id },
                    })

                    if (req.data.user.id != ad.Client_id) {
                        res.status(401).json('invalid access');
                    } else {
                        Advertisement.update(
                            { status: 5 }, {
                            where: { id: advertisement_id }
                            }).then((data) => {
                                res.status(201).json("complete")
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
                    if (req.data.user.id != ad.Advertisement_has_Suppliers[0].Supplier.id) {
                        res.status(401).json('invalid access');
                    } else {
                        Advertisement.update(
                            { status: 5 }, {
                            where: { id: advertisement_id }
                            }).then((data) => {
                                res.status(201).json("complete")
                            })
                    }
                }
            } catch (err) {
                res.status(400).json(err.message);
            }
    }
}