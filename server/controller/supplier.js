const { Supplier } = require('../models/index');


module.exports = {
    main: async(req, res) => { //최근 10개만
        try{
            let main_supplier = await Supplier.findAll({
                attributes: ['id', 'email', 'channelName', 'viewCount', 'subscriberCount', 'profileImgUrl'],
                order: [['id', 'DESC']],
                limit: 10,
            });
            res.status(200).json(main_supplier);
        }catch(err){
            res.status(400).json(err.message);
        }
    },
    list: async (req, res) => {
        try{
            let supplier_list = await Supplier.findAll({
                attributes: ['id', 'email', 'channelName', 'viewCount', 'subscriberCount', 'profileImgUrl'],
                order: [['id', 'DESC']],
            });
            res.status(200).json(supplier_list);
        }catch(err){
            res.status(400).json(err.message);
        }
    },
    detail: async (req, res)=> {
        try{
            let supplier_datail = await Supplier.findOne({
                attributes: ['id', 'email', 'channelName', 'channelUrl', 'viewCount', 'subscriberCount', 'profileImgUrl'],
                where: {
                    id: req.query.id
                },
            });
            res.status(200).json(supplier_datail);
        }catch(err){
            res.status(400).json(err.message);
        }
    },
}


// multisigAddress
// token_uri
// token_id
// token_address

