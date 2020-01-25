
const { Model } = require('objection');

class Login extends Model {
    static get tableName() {
        return '' + 'login';
    }
    static get idColumn() {
        return 'id';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                userId: { type: 'string' },
                password: { type: 'string' },
                role: { type: 'string' }
            }
        };
    }
}

module.exports = Login;