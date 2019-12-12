
const { Model } = require('objection');

class Trf_training_level extends Model {
    static get tableName() {
        return '' +'akrv_trf_training_level';
    }
    static get idColumn() {
        return 'level_id';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                level_id: { type: 'number' },
                level_name: { type: 'string' },
                updated_at: { type: 'timestamp' },
                created_at: { type: 'timestamp' }
            }
        };
    }
}

module.exports = Trf_training_level;