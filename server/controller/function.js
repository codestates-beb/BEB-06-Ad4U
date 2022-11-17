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
            try{
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
            }catch(error){
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
            try{
                const token = authorization.split(' ')[1];
                const data = jwt.verify(token, process.env.ACCESS_SECRET);

                const user = await Supplier.findOne({
                    attributes: ['id'],
                    where: { userId: data.userId },
                });

                Advertisement_has_Supplier.destroy({
                    where: { 
                        Advertisement_id: advertisement_id,
                        Supplier_id: user.id},
                }).then((data) => {
                    res.status(201).json("complete")
                }).catch((err) => {
                    res.status(400).json("DB error")
                });

            }catch(error){
                res.status(400).json(err)
            }
        }
    },
    conference: async (req, res)=> {// 광고 협의 - client
        
    },
}