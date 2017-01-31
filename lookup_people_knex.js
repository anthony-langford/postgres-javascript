const settings = require("./settings");
const db = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    ssl: settings.ssl
  }
});

const name = '%' + process.argv[2] + '%';
console.log(name);

console.log("Searching...");

db.select('*')
  .from('famous_people')
  .where('first_name', 'like', name)
  .orWhere('last_name', 'like', name)
  .then(function(rows) {
    console.log("Found " + rows.length + " person(s) by the name '" + name + "'");
    console.log("- " + rows[0].id + ": " + rows[0].first_name + " " + rows[0].last_name + ", born '" + rows[0].birthdate.toString().slice(0, 15) + "'");
  })
  .catch(function(error) {
    console.error(error)
  });