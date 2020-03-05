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

const queryString = `
SELECT students.id, students.name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

const values = [`%${args[0]}%`, args[1] || 5];

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(student => {
      console.log(`${student.name} has an id of ${student.id} and was in the ${student.cohort} cohort`);
    });
  })
  .catch(err => {
    console.error('query error', err.stack);
  });