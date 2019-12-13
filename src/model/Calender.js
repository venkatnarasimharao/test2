
const { Model } = require('objection');

class Calender extends Model {
    static get tableName() {
        return '' +'calendar';
    }
    static get idColumn() {
        return 'dt';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                dt: { type: 'date' }
            }
        };
    }
}

module.exports = Calender;