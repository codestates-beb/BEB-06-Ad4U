const {Client} = require('../models/index');

module.exports = {

    findAll: (req, res) => {
        res.send("1")
    },
    test: async (req, res) => {

        const test = {
            userId: "asdfsdafsadf",
            password: "asdfdsafasdfasdfsafa",
            company_name: "dfbdsgbfsgbf",
            company_number: "adsggbtrbrt",
            email: 'jingi@naver.om'
        }

        Client.create(test)
        .then(data=> {
            res.send(data);
        }).catch(err=> {
            res.send({err})
        })

    }
}