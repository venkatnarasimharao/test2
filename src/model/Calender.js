
const { Model } = require('objection');

class Calender extends Model {
    static get tableName() {
        return '' + 'calendar';
    }
    static get idColumn() {
        return 'id';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                dt: { type: 'date' }
            }
        };
    }
}

module.exports = Calender;