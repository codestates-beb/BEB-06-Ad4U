require("dotenv").config();
const { Client, Supplier, Advertisement, Advertisement_has_Supplier, Client_has_Supplier} = require('../models/index');
const jwt = require('jsonwebtoken');
const client_attributes = ['id', 'userId', 'company_name', 'company_number', 'email', 'profileImgUrl'];
const supplier_attributes = ['id', 'userId', 'email', 'channelName', 'channelUrl', 'viewCount', 'subscriberCount', 'profileImgUrl', 'address'];
const advertisement_attributes = ['id', 'title', 'AdimgUrl', 'cost', 'multisigAddress', 'token_id', 'token_address', 'token_uri', 'createdAt', 'status']
const axios = require("axios");
const jwt_decode = require('jwt-decode');
const { google } = require('googleapis');
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_PASSWORD,
    "http://localhost:3000/login"
);


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
                supplier_attributes.push("refreshToken");
                user = await Supplier.findOne({
                    attributes: supplier_attributes,
                    where: { userId: userId, password: password },
                });
                const refreshToken = user.refreshToken;
                if (refreshToken) {
                    delete user.dataValues.refreshToken;
                    axios.post("https://oauth2.googleapis.com/token", null, {
                        headers: {
                            "Content-Type": `application/x-www-form-urlencoded`
                        }, params: {
                            client_id: process.env.CLIENT_ID,
                            client_secret: process.env.CLIENT_PASSWORD,
                            refresh_token: refreshToken,
                            grant_type: "refresh_token"
                        }
                    }).then(async (data) => {
                        const youtube_info = await axios.get(`https://www.googleapis.com/youtube/v3/channels?access_token=${data.data.access_token}&part=snippet,statistics&mine=true&fields=items&2Fsnippet%2Fthumbnails`);
                        const body = {
                            channelName: youtube_info.data.items[0].snippet.title,
                            subscriberCount: youtube_info.data.items[0].statistics.subscriberCount,
                            viewCount: youtube_info.data.items[0].statistics.viewCount,
                            channelUrl: `https://www.youtube.com/channel/${youtube_info.data.items[0].id}`,
                            profileImgUrl: youtube_info.data.items[0].snippet.thumbnails.default.url,
                            channel_id: youtube_info.data.items[0].id
                        }
                        Supplier.update(body, {
                            where: { userId: userId },
                        })
                    })
                }
            }
            if (user) {
                const jwt_accessToken = jwt.sign({ user }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
                const jwt_refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET, { expiresIn: '3h' });
                res.cookie('jwt_refreshToken', jwt_refreshToken, {
                    maxAge: (60 * 60 * 3 * 1000)
                });
                res.status(200).json({ user, jwt_accessToken, isClient });
            } else {
                res.status(401).json("no authorization.. check id, password");
            }
        } catch (err) {
            res.status(400).json(err.message);
        }
    },
    logout: async (req, res) => {
        res.clearCookie('jwt_refreshToken'); //쿠키삭제
        res.status(200).json("logout");
    },
    authCode: async (req, res) => {
        const scopes = [
            "openid",
            "profile",
            "email",
            "https://www.googleapis.com/auth/youtube.readonly"
        ];

        const authorizationUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            include_granted_scopes: true
        });
        res.status(200).json(authorizationUrl);
    },
    auth: async (req, res) => {
        const { code } = req.body;
        try {
            let { tokens } = await oauth2Client.getToken(code);
            const user_info = jwt_decode(tokens.id_token);
            const youtube_info = await axios.get(`https://www.googleapis.com/youtube/v3/channels?access_token=${tokens.access_token}&part=snippet,statistics&mine=true&fields=items&2Fsnippet%2Fthumbnails`);
            let body = {
                email: user_info.email,
                channelName: youtube_info.data.items[0].snippet.title,
                subscriberCount: youtube_info.data.items[0].statistics.subscriberCount,
                viewCount: youtube_info.data.items[0].statistics.viewCount,
                channelUrl: `https://www.youtube.com/channel/${youtube_info.data.items[0].id}`,
                profileImgUrl: youtube_info.data.items[0].snippet.thumbnails.default.url,
                channel_id: youtube_info.data.items[0].id
            }

            const user = await Supplier.findOne({
                where: { email: user_info.email },
            });

            if (user) {
                if (user.userId) { //회원가입이 되어있을 경우
                    res.status(400).json("You are already a member")
                } else {  //auth 시도하다가 취소했을경우
                    Supplier.update(body, {
                        where: { email: user_info.email },
                    }).then(data => {
                        res.status(201).json({ email: user_info.email });
                    })
                }
            } else { //첫 auth - refresh token save
                body.refreshToken = tokens.refresh_token,
                    Supplier.create(body)
                        .then(data => {
                            res.status(201).json({ email: user_info.email });
                        })
            }
        } catch (err) {
            res.status(400).json(err.message);
        }


    },
    signup: async (req, res) => {
        let isClient = req.body.isClient;
        let body = req.body;
        delete body.isClient;
        try {
            const client_user = await Client.findOne({
                where: { userId: body.userId },
            });
            const supplier_user = await Supplier.findOne({
                where: { userId: body.userId },
            });
            if (client_user || supplier_user) { //아이디 중복확인
                res.status(400).json("아이디 중복")
            } else {
                if (isClient) {
                    Client.create(body)
                        .then(data => {
                            res.status(201).json("complete");
                        })
                } else {
                    Supplier.update(body, {
                        where: { email: req.body.email },
                    })
                        .then(data => {
                            res.status(201).json("complete");
                        })
                }
            }
        } catch (err) {
            res.status(400).json(err.message);
        }
    },
    refresh: async (req, res) => {
        let user;
        try {
            const client_user = await Client.findOne({
                attributes: client_attributes,
                where: { userId: req.data.userId },
            });
            const supplier_user = await Supplier.findOne({
                attributes: supplier_attributes,
                where: { userId: req.data.userId },
            });

            if (client_user) {
                user = client_user;
                const jwt_accessToken = jwt.sign({ user }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
                res.status(200).json({ jwt_accessToken, user, isClient: true });
            } else if (supplier_user) {
                user = supplier_user;
                const jwt_accessToken = jwt.sign({ user }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
                res.status(200).json({ jwt_accessToken, user, isClient: false });
            } else {
                res.status(401).json("login again");
            }
        } catch (err) {
            res.status(400).json(err.message)
        }
    },
    mypage: async (req, res) => {
        const { isClient } = req.query;
        let user;
        try {
            if (JSON.parse(isClient)) {
                client_attributes.push('profileImgUrl', 'intro');
                user = await Client.findOne({
                    attributes: client_attributes,
                    where: { userId: req.data.user.userId },
                    include: [
                        {
                            model: Advertisement, as: "Advertisements",
                            attributes: advertisement_attributes,
                            include: [
                                {
                                    model: Advertisement_has_Supplier, as: "Advertisement_has_Suppliers",
                                    include: [
                                        {
                                            model: Supplier, as: "Supplier",
                                            attributes: ['id', 'channelName', 'channelUrl', 'viewCount', 'subscriberCount', 'profileImgUrl', 'address'],
                                        }
                                    ],
                                }
                            ]
                        }
                    ]
                });
            } else {
                user = await Supplier.findOne({
                    attributes: supplier_attributes,
                    where: { userId: req.data.user.userId },
                    include: [
                        {
                            model: Advertisement_has_Supplier, as: "Advertisement_has_Suppliers",
                            include: [
                                {
                                    model: Advertisement, as: "Advertisement",
                                    attributes: advertisement_attributes,
                                },
                                
                            ]
                        },
                        {
                            model: Client_has_Supplier, as: "Client_has_Suppliers",
                            include: [
                                {
                                    model: Client, as: "Client",
                                    attributes: ['id', 'company_name', 'company_number', 'email', 'profileImgUrl'],
                                },
                                {
                                    model: Advertisement, as: "Advertisement",
                                    attributes: ['id', 'title', 'AdimgUrl', 'cost', 'createdAt'],
                                }
                            ]
                        }
                    ]
                });
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json(err.message)
        }
    }
}