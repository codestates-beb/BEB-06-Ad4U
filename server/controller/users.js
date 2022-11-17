require("dotenv").config();
const { Client, Supplier, Advertisement, Advertisement_has_Supplier } = require('../models/index');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const client_attributes = ['id', 'userId', 'company_name', 'company_number', 'email'];
const supplier_attributes = ['id', 'userId', 'email', 'channelName', 'channelUrl', 'viewCount', 'subscriberCount', 'profileImgUrl', 'address'];
const axios = require("axios");
const jwt_decode = require('jwt-decode');

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
                //google_refresh token으로 유저 정보 DB업데이트 구현해야함
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
    auth: async (req, res) => {
        const { code } = req.body;
            axios.post("https://oauth2.googleapis.com/token", null, {
                headers: {
                    "Content-Type": `application/x-www-form-urlencoded`
                }, params: {
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_PASSWORD,
                    code: code,
                    redirect_uri: "http://localhost:3000/login",
                    grant_type: "authorization_code"
                }
            }).then(async (response) => {
                res.cookie('google_refreshToken', response.data.refresh_token, {
                    maxAge: 60 * 60 * 1000
                });
                const user_info = jwt_decode(response.data.id_token);
                const access_token = response.data.access_token;

                const youtube_info = await axios.get(`https://www.googleapis.com/youtube/v3/channels?access_token=${access_token}&part=snippet,statistics&mine=true&fields=items&2Fsnippet%2Fthumbnails`)
                    .then((res) => {
                        return res.data
                    }).catch(err => console.log(err))

                const user = await Supplier.findOne({
                    where: { email: user_info.email },
                });

                if (user) {
                    const body = {
                        channelName: youtube_info.items[0].snippet.title,
                        subscriberCount: youtube_info.items[0].statistics.subscriberCount,
                        viewCount: youtube_info.items[0].statistics.viewCount,
                        channelUrl: `https://www.youtube.com/channel/${youtube_info.items[0].id}`,
                        profileImgUrl: youtube_info.items[0].snippet.thumbnails.default.url,
                    }

                    Supplier.update(body, {
                        where: { email: user_info.email },
                    }).then(data => {
                        res.status(201).json({ email: user_info.email });
                    }).catch(err => {
                        res.status(400).json("DB error")
                    })

                } else {
                    const body = {
                        channelName: youtube_info.items[0].snippet.title,
                        subscriberCount: youtube_info.items[0].statistics.subscriberCount,
                        viewCount: youtube_info.items[0].statistics.viewCount,
                        channelUrl: `https://www.youtube.com/channel/${youtube_info.items[0].id}`,
                        profileImgUrl: youtube_info.items[0].snippet.thumbnails.default.url,
                        email: user_info.email,
                        refreshToken: response.data.refresh_token,
                    }
                    Supplier.create(body)
                        .then(data => {
                            res.status(201).json({ email: user_info.email });
                        }).catch(err => {
                            res.status(400).json("DB error")
                        })
                }
            }).catch((err) => {
                res.status(401).json(err);
            })
    },
    signup: async (req, res) => {
        let isClient = req.body.isClient;
        let body = req.body;
        delete body.isClient;

        if (isClient) {
            const user = await Client.findOne({
                where: { userId: body.userId, password: body.password },
            });
            if (user) { //아이디 중복확인
                res.status(400).json("아이디 중복")
            } else {
                Client.create(body)
                    .then(data => {
                        res.status(201).json("complete");
                    }).catch(err => {
                        res.status(400).json("DB error");
                    })
            }
        } else {
            const refreshToken = req.cookies.google_refreshToken;
            body.refreshToken = refreshToken;

            const user = await Supplier.findOne({
                where: { userId: body.userId, password: body.password },
            });
            if (user) {
                res.status(400).json("아이디 중복")
            } else {
                Supplier.update(body, {
                    where: { email: req.body.email },
                })
                    .then(data => {
                        res.status(201).json("complete");
                    }).catch(err => {
                        res.status(400).json("DB error")
                    })
            }
        }
    },
    refresh: async (req, res) => {
        const { isClient } = req.query;
        let user;
        if (!req.cookies.jwt_refreshToken) {
            res.status(400).send({ data: null, message: "refresh token not provided" });
        } else {
            try {
                const data = jwt.verify(req.cookies.jwt_refreshToken, process.env.REFRESH_SECRET);
                if (isClient == "true") {
                    user = await Client.findOne({
                        attributes: client_attributes,
                        where: { userId: data.userId },
                    });
                } else {
                    user = await Supplier.findOne({
                        attributes: supplier_attributes,
                        where: { userId: data.userId },

                    });
                }

                const userId = user.userId;

                if (user) {
                    const jwt_accessToken = jwt.sign({ userId }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
                    res.status(200).json({ jwt_accessToken, user, isClient });
                } else {
                    res.status(401).json("Invalid refreshToken, login again")
                }
            } catch (error) {
                res.status(400).json(error)
            }

        }

    },
    mypage: async (req, res) => {
        const authorization = req.headers.authorization;
        const { isClient } = req.query;
        console.log(isClient)
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);
        if (!authorization) {
            res.status(404).send({ data: null, message: 'invalid access token' });

        } else {

            if (isClient == "true") {
                try {
                    const user = await Client.findOne({
                        attributes: client_attributes,
                        where: { userId: data.userId },
                        include: [
                            {
                                model: Advertisement, as: "Advertisements",
                                attributes: ['id', 'title', 'AdimgUrl', 'cost', 'createdAt', 'status'],
                                include: [
                                    {
                                        model: Advertisement_has_Supplier, as: "Advertisement_has_Suppliers",
                                        include: [
                                            {
                                                model: Supplier, as: "Supplier",
                                                attributes: ['id', 'channelName', 'channelUrl', 'viewCount', 'subscriberCount', 'profileImgUrl'],
                                            }
                                        ],
                                    }
                                ]
                            },
                        ]
                    });
                    res.status(200).json(user);

                } catch (err) {
                    res.status(400).json(err)
                }
            } else {
                try {
                    const user = await Supplier.findOne({
                        attributes: supplier_attributes,
                        where: { userId: data.userId },
                        include: [
                            {
                                model: Advertisement_has_Supplier, as: "Advertisement_has_Suppliers",
                                include: [
                                    {
                                        model: Advertisement, as: "Advertisement",
                                        attributes: ['id', 'title', 'AdimgUrl', 'cost', 'createdAt'],
                                    },
                                ]
                            }
                        ]
                    });
                    res.status(200).json(user);

                } catch (err) {
                    res.status(400).json(err)
                }
            }
        }

    }
}