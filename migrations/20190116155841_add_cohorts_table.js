
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', table => {
      table.increments();
      table
        .string('name', 255)
        .notNullable()
        .unique('uq_cohort_name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
