const { Client, Advertisement, Supplier } = require('../models/index');
const supplier_attributes = ['userId', 'email', 'channelName', 'channelUrl', 'viewCount', 'subscriberCount', 'profileImgUrl', 'address'];
const jwt = require('jsonwebtoken');


module.exports = {
    main: async(req, res) => { //최근 10개만
        try{
            let main_supplier = await Supplier.findAll({
                attributes: ['id', 'email', 'channelName', 'viewCount', 'subscriberCount', 'profileImgUrl'],
                order: [['id', 'DESC']],
                limit: 10,
               // offset: 5,
            });
            res.status(200).json(main_supplier);
        }catch(error){
            res.status(400).json(error);
        }
    },
    list: async (req, res) => {
        try{
            let supplier_list = await Supplier.findAll({
                attributes: ['id', 'email', 'channelName', 'viewCount', 'subscriberCount', 'profileImgUrl'],
                order: [['id', 'DESC']],
                //limit: 10,
               // offset: 5,
            });
            res.status(200).json(supplier_list);
        }catch(error){
            res.status(400).json(error);
        }

    },
    detail: async (req, res)=> {
        try{
            let supplier_datail = await Supplier.findOne({
                attributes: ['id', 'email', 'channelName', 'channelUrl', 'viewCount', 'subscriberCount', 'profileImgUrl'],
                where: {
                    id: req.query.id
                },
                

                //limit: 10,
               // offset: 5,
            });
            res.status(200).json(supplier_datail);
        }catch(error){
            res.status(400).json(error);
        }


    },
}


// multisigAddress
// token_uri
// token_id
// token_address

