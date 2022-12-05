const { Client } = require('../models/index');
const client_attributes = ['id', 'company_name', 'company_number', 'email', 'profileImgUrl'];

module.exports = {
    main: async (req, res) => { //최근 10개만
        try {
            let client_main = await Client.findAll({
                attributes: client_attributes,
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
                attributes: client_attributes,
                order: [['id', 'DESC']],
            });
            res.status(200).json(client_list);
        } catch (err) {
            res.status(400).json(err.message);
        }
    },
    detail: async (req, res) => {
        try{
            client_attributes.push('intro');
            let client_detail = await Client.findOne({
                attributes: client_attributes,
                where: {
                    id: req.query.id
                },
            });
            res.status(200).json(client_detail);
        }catch(err){
            res.status(400).json(err.message);
        }
    },
    inputInfo: async (req, res) => { //사용자 정보 입력
        const {intro, profileImgUrl} = req.body;
        try {
            let body = {};
            if(intro) body.intro = intro;
            if(profileImgUrl) body.profileImgUrl = profileImgUrl;

            Client.update(body,
                { where: { id: req.data.user.id} })
                .then((data) => {
                    res.status(201).json("complete")
                })
        } catch (err) {
            res.status(400).json(err.message);
        }
    },
}