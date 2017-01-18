var Datastore = require('nedb')
var db = {}
db.users = new Datastore({ filename: 'data/users.json', autoload: true });
db.bitelog = new Datastore({ filename: 'data/bitelog.json', autoload: true });
module.exports = db;
