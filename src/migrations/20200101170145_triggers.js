
exports.up = function (knex, Promise) {
    return (
        knex.schema
            .raw(`
            CREATE TRIGGER addInventory AFTER INSERT
            ON calendar
            FOR EACH ROW
            
            BEGIN

            insert into inventory(id, name, dt) values(new.id, 'triggers', '2019-12-18');
            END
            `)
    );
};

exports.down = function (knex, Promise) {
    return knex.schema
        .raw("DROP TRIGGER IF EXISTS addInventory;");
};
