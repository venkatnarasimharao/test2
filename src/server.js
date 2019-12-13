'use strict';
const { Server } = require('hapi');
const Config = require('./config/config');
const endpoints = require("./routes")
const app = {};

// this line is used to implement mapping between knex and model
// import Knexx from '../src/config/Knex';
const Knexx = require('../src/config/Knex');
//  now model is required
const { Model } = require('objection');
//  now map both.
Model.knex(Knexx);


app.config = Config;
const server = new Server();

const obj = {
    port: JSON.parse(`${app.config.server.port}`),
    host: `${app.config.server.host}`,
    database: `${app.config.database.db}`,
    db_host: `${app.config.database.host}`
}
server.connection({
    port: app.config.server.port,
});

server.route(endpoints);

server.start((err) => {
    if (err) {
        console.log(err)
        throw err
    }
    console.log("server started on \n", obj);
})

module.exports = server;