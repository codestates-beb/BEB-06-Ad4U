const { Advertisement, Advertisement_has_Supplier, Supplier } = require('../models/index');
const { Op } = require('sequelize');

module.exports = {
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