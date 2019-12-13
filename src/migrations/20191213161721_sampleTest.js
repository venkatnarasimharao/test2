
exports.up = function(knex) {
    try {
        return knex.schema
            .createTableIfNotExists("calendar", function (table) {
                table.date("dt").unique();
            })
    } catch (err) {
        exports.down();
    }  
};

exports.down = function(knex) {
    return knex
    .raw("SET foreign_key_checks = 0;")
    .then(() => knex.schema
        .dropTableIfExists("calendar"))
    .finally(() => knex.raw("SET foreign_key_checks = 1;"));
};
