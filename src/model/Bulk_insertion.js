const { Model } = require('objection');

class Bulk_insertion extends Model {
    static get tableName() {
        return 'bulk_insertion';
    }
    static get idColumn() {
        return 'id';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' }
            }
        };
    }
}
module.exports = Bulk_insertion;