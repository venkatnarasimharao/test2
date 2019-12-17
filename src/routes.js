const fetch = require("../src/controller/fetch");
const fetchDetails = require('./controller/fetch');

const endpoints =[
    {
        method: 'GET',
        path: '/fetch',
        config: fetch.fetchDetails
    },
    {
        method:'POST',
        path:'/post',
        config:fetch.postData
    }

    // ...fetchDetails
];
module.exports = endpoints;