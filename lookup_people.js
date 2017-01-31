const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const q = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE UPPER(first_name) LIKE UPPER($1) OR UPPER(last_name) LIKE CONCAT('%',UPPER($1),'%')", [`${q}`], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    } else {
      console.log("Searching...");
      console.log("Found " + result.rows.length + " person(s) by the name '" + result.rows[0].first_name + " " + result.rows[0].last_name + "'");
      console.log("- " + result.rows[0].id + ": " + result.rows[0].first_name + " " + result.rows[0].last_name + ", born '" + result.rows[0].birthdate.toString().slice(0, 15) + "'");
    }
    client.end();
  });
});