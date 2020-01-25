const userquery = require('../library/userquery');
const loginModel = require('../model/Login');

exports.userLogin = {
    handler: async (req, res) => {
        console.log(req.payload, "login")
        let whereCond = `userId = '${req.payload.username}' && password ='${req.payload.password}'`
        await userquery.simpleselect(loginModel, `*`, whereCond).then(data => {
            console.log(data,"aaaa")
            let response = {
                result: data,
                success: true,
                message: 'success data'
            }
            return res(response);
        }).catch(err => {
            console.log(err, "err in login");
            let response = {
                error: err,
                success: false,
                message: 'error data'
            }
            return res(response);
        })
    }
}