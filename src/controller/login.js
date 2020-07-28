const userquery = require("../library/userquery");
const loginModel = require("../model/Login");
const process = require("../config/config");
// for creating token
const jwt = require("jsonwebtoken");
// compare password becription
// const bcrypt = require('bcrypt');
// bcrypt.compare(req.password, resp[0].password)

exports.userLogin = {
  handler: async (req, res) => {
    console.log(req.payload, "login");
    let whereCond = `userId = '${req.payload.username}' && password ='${req.payload.password}'`;
    await userquery
      .simpleselect(loginModel, `*`, whereCond)
      .then((data) => {
        console.log(data[0], "aaaa");
        // setting jwt token and sending to ui
        const token = jwt.sign(
          {
            user_id: data[0].userId,
            role: data[0].role,
          },
          process.key,
          {
            algorithm: "HS512",
            expiresIn: "12h",
          }
        );
        let response = {
          result: data,
          token: token,
          success: true,
          message: "success data",
        };
        return res(response);
      })
      .catch((err) => {
        console.log(err, "err in login");
        let response = {
          error: err,
          success: false,
          message: "error data",
        };
        return res(response);
      });
  },
};
