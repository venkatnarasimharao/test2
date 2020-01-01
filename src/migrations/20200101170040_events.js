
exports.up = function (knex, Promise) {
    return (
        knex.schema
            .raw(`CREATE EVENT IF NOT EXISTS cancel_prev_day_batches
            ON SCHEDULE EVERY '1' DAY
            STARTS '2019-09-12 03:00:00'
            DO 
            call cancel_prev_day_batches();
            `)
    );
};

exports.down = function (knex, Promise) {
    return knex.schema
        .raw("DROP EVENT IF EXISTS cancel_prev_day_batches;");

};
