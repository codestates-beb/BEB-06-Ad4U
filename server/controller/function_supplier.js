const { Advertisement, Advertisement_has_Supplier, Supplier, Client_has_Supplier } = require('../models/index');
const { Op } = require('sequelize');

module.exports = {
    apply: async (req, res) => { //광고 지원 - supplier
        const { advertisement_id } = req.body;
        try {
            const body = {
                Advertisement_id: advertisement_id,
                Supplier_id: req.data.user.id
            }
            const data = await Advertisement_has_Supplier.findOne({where : body});
            if(data){
                await Client_has_Supplier.destroy({
                    where: {
                        Advertisement_id: advertisement_id,
                        Supplier_id: req.data.user.id
                    },
                });
                res.status(201).json("already applied");
            }else{
                await Advertisement_has_Supplier.create(body);
                await Client_has_Supplier.destroy({
                    where: {
                        Advertisement_id: advertisement_id,
                        Supplier_id: req.data.user.id
                    },
                });
                res.status(201).json("complete");
            }
            

        } catch (err) {
            res.status(400).json(err.message)
        }
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
    refuse: async (req, res) => { //광고 거절 - supplier
        const { advertisement_id } = req.body;

        Client_has_Supplier.destroy({
            where: {
                Advertisement_id: advertisement_id,
                Supplier_id: req.data.user.id
            },
        }).then((data) => {
            res.status(201).json("complete")
        }).catch((err) => {
            res.status(400).json(err.message)
        });
    }
}