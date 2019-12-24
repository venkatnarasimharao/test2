const fetch = require("../src/controller/fetch");
const fetchDetails = require('./controller/fetch');
const userlogin = require('./controller/login')
const endpoints = [
    {
        method: 'GET',
        path: '/fetch',
        config: fetch.fetchDetails
    },
    {
        method: 'POST',
        path: '/postCalendarData',
        config: fetch.postData
    },
    {
        method: 'POST',
        path: '/deleteCalendar',
        config: fetch.deleteCalendarData
    },
    {
        method: 'POST',
        path: '/userlogin',
        config: userlogin.userLogin
    }

    // ...fetchDetails
];
module.exports = endpoints;