const userquery = require("../library/userquery");
const Trf_level = require('../model/Trf_management_level');
const Calender = require('../model/Calender');

exports.fetchDetails = {
    handler(req, res) {
        let columnlist = ['*'];
        userquery.simpleselect(Calender, columnlist, null).then(resu => {
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

exports.postData = {
    handler: async (req, res) => {
        console.log(req.payload)
        userquery.insertTable(Calender, req.payload).then(resu => {
            console.log("aaaaaaaa")
            let response = {
                result: resu,
                success: true,
                message: 'Data inserted Successfully'
            }
            console.log(resu)
            return res(response);
        }).catch(err => {
            let response = {
                error: err,
                message: 'unable to insert data'
            }
            console.log(err, "err")
            return res(response);
        })
    }
}
// const fetchDetails=  [
//     {
//         path: '/fetch',
//         method: "GET",
//         handler: async (request, reply) => { 
//             let columnlist = ['*'];
//            await userquery.simpleselect(Calender,columnlist,null).then(data => {
//                 let res = {
//                     data: data,
//                     success: true,
//                     message: "Got Calendar List successfully"
//                 };
//                 return reply(res);
//             }).catch(err => {
//                 let res = {
//                     success: false,
//                     error: err,
//                     message: "unable to fetch data"
//                 }
//                 return reply(res);
//             });
//         }
//     }
// ]
// module.exports = fetchDetails