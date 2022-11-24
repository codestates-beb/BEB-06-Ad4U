const { Client, Advertisement } = require('../models/index');


module.exports = {
    main: async (req, res) => { //최근 10개만
        try {
            let client_main = await Client.findAll({
                attributes: ['id', 'company_name', 'company_number', 'email'],
                order: [['id', 'DESC']],
                limit: 10,
            });
            res.status(200).json(client_main);
        } catch (err) {
            res.status(400).json(err.message);
        }

    },
    list: async (req, res) => {
        try {
            let client_list = await Client.findAll({
                attributes: ['id', 'company_name', 'company_number', 'email'],
                order: [['id', 'DESC']],
                include: [
                    { model: Advertisement, as: "Advertisements", attributes: ["id"],  where: {
                        status : 0
                    },
                },
                ]
            });
            res.status(200).json(client_list);
        } catch (err) {
            res.status(400).json(err.message);
        }
    },
    detail: async (req, res) => {
        try{
            let client_datail = await Client.findOne({
                attributes: ['id', 'company_name', 'company_number', 'email'],
                where: {
                    id: req.query.id
                },
                include: [
                    {
                        model: Advertisement, as: "Advertisements",
                        attributes: ['id', 'title', 'AdimgUrl', 'cost', 'createdAt'],
                        where: {
                            status: 0
                        }
                    },
                ]
            });
            res.status(200).json(client_datail);
        }catch(err){
            res.status(400).json(err.message);
        }
    }
}


// multisigAddress
// token_uri
// token_id
// token_address