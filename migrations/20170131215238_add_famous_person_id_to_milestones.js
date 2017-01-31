exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function(table) {
      table.integer('famous_person_id').unsigned();
      table.foreign('famous_person_id').references('famous_people.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    table.dropForeign('famous_person_id', 'famous_people.id'),
    table.dropColumn('famous_person_id')
  ])
};