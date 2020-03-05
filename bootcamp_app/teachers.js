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

/*
  Queries
*/

pool.query(`
  SELECT DISTINCT teachers.name as name, cohorts.name as cohort
  FROM assistance_requests
  JOIN teachers ON teacher_id = teachers.id
  JOIN students ON student_id = students.id
  JOIN cohorts ON cohort_id = cohorts.id
  WHERE cohorts.name LIKE '${process.argv[2] || 'JUL02'}%'
  ORDER BY name;
`)
  .then(res => {
    res.rows.forEach(teacher => {
      console.log(`${teacher.cohort}: ${teacher.name}`);
    });
  })
  .catch(err => {
    console.error('query error', err.stack);
  });