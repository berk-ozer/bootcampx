/*
  App config
*/

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const args = process.argv.slice(2);

/*
  Queries
*/

pool.query(`
SELECT students.id, students.name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE '${args[0]}%'
LIMIT ${args[1] || 5};
`)
  .then(res => {
    res.rows.forEach(student => {
      console.log(`${student.name} has an id of ${student.id} and was in the ${student.cohort} cohort`);
    });
  })
  .catch(err => {
    console.error('query error', err.stack);
  });