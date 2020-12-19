const userquery = require("../library/userquery");
const loginModel = require("../model/Login");
// test
const stateModel = require("../model/State");
const countryModel = require("../model/Country");
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

exports.eagerQuery = {
  handler: async (request, reply) => {
    let response = {};
    // console.log(request, "reqqqqqqqqqqqqqqqq");
    try {
      const relationResp = countryModel
      .query()
      .select()
      .eager('stateMapping(selectState)',{
        selectState : builder => {
          builder.select(
            'state'
          )
        }
      });
      // also can be written as 
      // .eager('stateMapping')
    await relationResp
      .then(async resp => {
        response = {
          data : resp,
          success: true,
          message: "success data",
        };
        console.log(resp)
      })
    } catch (error) {
      response = {
        error : error,
        success: false,
        message: "failed data",
      }
      console.log(error, "error");
    }
    return await reply(response);
  }
};
