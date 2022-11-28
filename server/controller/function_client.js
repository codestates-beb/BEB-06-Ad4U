const { Advertisement, Advertisement_has_Supplier, Supplier, Client_has_Supplier } = require('../models/index');
const { Op } = require('sequelize');

module.exports = {
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
    propose: async (req, res) => { //광고 제안 - client
        const { supplier_id, advertisement_id } = req.body;
        try {
            const body = {
                Supplier_id: supplier_id,
                Advertisement_id: advertisement_id,
                Client_id: req.data.user.id
            }
            Client_has_Supplier.create(body)
                .then((data) => {
                    res.status(201).json("complete")
                }).catch((err) => {
                    res.status(400).json(err.message)
                });
        } catch (err) {
            res.status(400).json(err.message);
        }
    }
}