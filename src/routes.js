const fetch = require("../src/controller/fetch");

const endpoints =[
    {
        method: 'GET',
        path: '/fetch',
        config: fetch.fetchDetails
    }
];
module.exports = endpoints;