const { Model } = require("objection");

class State extends Model {
  static get tableName() {
    return "state";
  }
  static get idColumn() {
    return "id";
  }
  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        country_id: {type : 'integer'},
        state: { type: "string" },
        created_at: { type: "datetime" },
        updated_at: { type: "timestamp" },
      }
    };
  }
}
module.exports = State;
