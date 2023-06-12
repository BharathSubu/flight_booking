const jwt = require("jsonwebtoken");
const config = require("./config");

//needed to be modified to user specific  so other user may not access other user's data only their data
let checkUserToken = (req, res, next) => {
  let token = req.headers["authorization"];
  token = token.slice(7, token.length);
  if (token) {
    jwt.verify(token, config.key, (err, decoded) => {
      if (err) {
        return res.json({
          status: false,
          msg: "token is invalid",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      status: false,
      msg: "Token is not provided",
    });
  }
};

let checkAdminToken = (req, res, next) => {
  let token = req.headers["authorization"];
  token = token.slice(7, token.length);
  if (token) {
    jwt.verify(token, config.key, (err, decoded) => {
      if (err) {
        return res.json({
          status: false,
          msg: "token is invalid",
        });
      } else {
        req.decoded = decoded;
        if (!req.decoded.isAdmin)
          return res.json({
            status: false,
            msg: "Admin access Invalid",
          });
        next();
      }
    });
  } else {
    return res.json({
      status: false,
      msg: "Token is not provided",
    });
  }
};

module.exports = {
  checkUserToken: checkUserToken,
  checkAdminToken: checkAdminToken,
};
