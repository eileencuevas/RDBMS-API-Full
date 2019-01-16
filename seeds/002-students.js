
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Laurie Hellman', cohort_id: 1 },
        { name: 'Andrew McCool', cohort_id: 1 },
        { name: 'Lizzie B. Bowling', cohort_id: 2 }
      ]);
    });
};
