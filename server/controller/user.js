require("dotenv").config();
const { Client, Supplier } = require('../models/index');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const client_attributes = ['userId', 'company_name', 'company_number', 'email'];
const supplier_attributes = ['userId', 'email', 'channelName', 'channelUrl', 'viewCount', 'subscriberCount', 'profileImgUrl', 'address'];


module.exports = {
    login: async (req, res) => {
        const { userId, password, isClient } = req.body;
        let user;
        try {
            if (isClient) {
                user = await Client.findOne({
                    attributes: client_attributes,
                    where: { userId: userId, password: password },
                });
            } else {
                user = await Supplier.findOne({
                    attributes: supplier_attributes,
                    where: { userId: userId, password: password },
                });
            }
            if (user) {
                const jwt_accessToken = jwt.sign({ userId }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
                const jwt_refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET, { expiresIn: '3h' });
                res.cookie('jwt_refreshToken', jwt_refreshToken, {
                    maxAge: 60 * 60 * 1000
                });
                res.status(200).json({ user, jwt_accessToken, isClient });
            } else {
                res.status(401).json("no authorization.. check id, password");
            }
        } catch (error) {
            res.status(400).json(error);
        }
    },
    signup: async (req, res) => {
        let isClient = req.body.isClient;
        let body = req.body;
        delete body.isClient;

        //중복확인 DB에서 unique로 해도 됨
        if (isClient) {
            const user = await Client.findOne({
                where: { userId: body.userId, password: body.password },
            });
            if (user) { //아이디 중복확인
                res.status(400).json("아이디 중복")
            } else {
                Client.create(body)
                    .then(data => {

                        res.status(201).json(data);
                    }).catch(err => {
                        res.status(401).json(err)
                    })
            }
        } else {
            const user = await Supplier.findOne({
                where: { userId: body.userId, password: body.password },
            });
            if (user) {
                res.status(400).json("아이디 중복")
            } else {

                //body에 userId, password, email, address

                //autorizationcode를 통해 google에서 accessToken과 refreshToken

                //accessToken으로 유튜브 정보

                //body에 refreshToken, channelName, subscriberCount, viewCount, profileImgUrl, channelUrl
                Supplier.create(body)
                    .then(data => {

                        res.status(201).json(data);

                    }).catch(err => {
                        res.status(401).json(err)
                    })
            }

        }
    },
    refresh: async (req, res) => {
        const isClient = req.query.isClient;
        let user;
        if (!req.cookies.jwt_refreshToken) {
            res.status(400).send({ data: null, message: "refresh token not provided" });
        } else {
            try{
                const data = jwt.verify(req.cookies.jwt_refreshToken, process.env.REFRESH_SECRET);
                if(isClient){
                    user = await Client.findOne({
                        attributes: client_attributes,
                        where: { userId: data.userId },
                    });
                }else{
                     user = await Supplier.findOne({
                        attributes: supplier_attributes,
                        where: { userId: data.userId},
                    });
                }

                const userId = user.userId;

                if(user){
                    const jwt_accessToken = jwt.sign({ userId }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
                    res.status(200).json({jwt_accessToken, user, isClient});
                }else{
                    res.status(401).json("Invalid refreshToken login again")
                }
            }catch(error){
                res.status(401).json(error)
            }

        }

    }
}