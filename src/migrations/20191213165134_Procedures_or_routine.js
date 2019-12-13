var fs = require('fs');
var file = fs.readFileSync('src/sqlfilesforprocedure/test.sql').toString();

console.log(file);

exports.up = function (knex, Promise) {
    console.log(file, "file path")
    return knex.schema.raw(file);
};

exports.down = function (knex, Promise) {
    return knex.schema.raw('DROP PROCEDURE IF EXISTS calendar_data;')
};