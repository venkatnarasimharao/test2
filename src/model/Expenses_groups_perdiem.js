const { Model } = require('objection')
const CountryModel = require('../general_settings/Countries')
const StateModel = require('../general_settings/States')

class Expenses_groups_perdiem extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'expenses_groups_perdiem'
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get idColumn() {
    return 'id'
  }

  static get relationMappings() {
    return {
      CountryRelation: {
        relation: Model.HasManyRelation,
        modelClass: CountryModel,
        join: {
          from: 'countries.id',
          to: 'expenses_groups_perdiem.country_id'
        }
      },
      StateRelation: {
        relation: Model.HasManyRelation,
        modelClass: StateModel,
        join: {
          from: 'state.stateid',
          to: 'expenses_groups_perdiem.location_id'
        }
      }
    }
  }


  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: { type: ['integer', null] },
        group_id: { type: 'integer' },
        country_id: { type: 'integer' },
        location_id: { type: 'integer' },
        effective_date: { type: 'string' },
        per_day_rate: { type: 'integer' },
        created_at: { type: 'datetime' },
        updated_at: { type: 'timestamp' }
      }
    }
  }
}

module.exports = Expenses_groups_perdiem
