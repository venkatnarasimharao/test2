const userquery = require("../library/userquery");
const Trf_level = require('../model/Trf_management_level');

exports.fetchDetails = {
    handler(req, res) {
        let columnlist = ['*'];
        userquery.simpleselect(Trf_level, columnlist,null).then(resu => {
            let response = {
                result: resu,
                success: true,
                message: 'fetching data'
            }
            return res(response);
        }).catch(err => {
            let response = {
                error: err,
                success: false,
                message: 'unable to fetch data'
            }
            return res(response);
        })
    }
}