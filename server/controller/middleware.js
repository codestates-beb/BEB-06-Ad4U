const jwt = require('jsonwebtoken');
require("dotenv").config();


module.exports = {
      isLoggedIn: (req, res, next) => {
        try {
          const authorization = req.headers.authorization;
          if (!authorization) {
            res.status(401).json("invalid access");
          } else {
              const token = authorization.split(' ')[1];
              const data = jwt.verify(token, process.env.ACCESS_SECRET);
              req.data = data;
              next();
          }
        } catch (err) {
          res.status(401).json(err.message);
        }
      },
      isLoggedIn_client: (req, res, next) => {
        try {
          const authorization = req.headers.authorization;
          const {isClient} = req.body
          if (!authorization || !isClient) {
            res.status(401).json("invalid access");
          } else {
              const token = authorization.split(' ')[1];
              const data = jwt.verify(token, process.env.ACCESS_SECRET);
              req.data = data;
              next();
          }
        } catch (err) {
          res.status(401).json(err.message);
        }
      },
      isLoggedIn_supplier: (req, res, next) => {
        try {
          const authorization = req.headers.authorization;
          const {isClient} = req.body
          if (!authorization || isClient) {
            res.status(401).json("invalid access");
          } else {
              const token = authorization.split(' ')[1];
              const data = jwt.verify(token, process.env.ACCESS_SECRET);
              req.data = data;
              next();
          }
        } catch (err) {
          res.status(401).json(err.message);
        }
      },
      isCookieIn: (req, res, next) => {
        try {
          if (!req.cookies.jwt_refreshToken) {
              res.status(200).send({message: "refresh token not provided"});
          } else {
              const data = jwt.verify(req.cookies.jwt_refreshToken, process.env.REFRESH_SECRET);
              req.data = data;
              next();
          }
        } catch (err) {
          res.status(401).json(err.message);
        }
      },
}