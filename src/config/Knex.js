const config = require('./config')

module.exports =  require('knex')({
  client: 'mysql',
  connection: {
    host: config.database.host,
    user: config.database.username,
    password: config.database.password,
    database: config.database.db,
    charset: 'utf8'
  }, 
  "debug": true,
  "pool": {
    "min": 2,
    "max": 25,
    "createTimeoutMillis": 30000,
    "acquireTimeoutMillis": 30000,
    "idleTimeoutMillis": 30000,
    "reapIntervalMillis": 1000,
    "createRetryIntervalMillis": 2000,
    "propagateCreateError": true
  },
 /* ,
  pool: {
    min: 1,
    max: 10
  } */
});