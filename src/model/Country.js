const { Model } = require("objection");
const stateModel = require("./State");

class Country extends Model {
  static get tableName() {
    return "country";
  }
  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      stateMapping: {
        relation: Model.HasManyRelation,
        modelClass: stateModel,
        join: {
          from: "state.country_id",
        //   trough : {
        //       from : '',
        //       to : ''
        //   },
          to: "country.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      require: [],
      properties: {
        id: { type: "integer" },
        country: { type: "string" },
        created_at: { type: "timestamp" },
        updated_at: { type: "timestamp" },
      },
    };
  }
}
module.exports = Country;
