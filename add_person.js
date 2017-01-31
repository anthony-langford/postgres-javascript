const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    ssl: settings.ssl
  }
});

const newFirstName = process.argv[2];
const newLastName = process.argv[3];
const newBirthdate = process.argv[4];


knex('famous_people').insert({first_name: newFirstName, last_name: newLastName, birthdate: newBirthdate})
  .then(function(){
    console.log("Successfully added " + newFirstName + " " + newLastName + " " + newBirthdate);
  })
  .catch(function(error) {
    console.error(error)
  });