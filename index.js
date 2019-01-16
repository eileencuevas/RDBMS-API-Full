const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile');

const server = express();
const db = knex(knexConfig.development);

server.use(express.json());

server.get('/api/cohorts/:id/students', (req, res) => {
    db('students')
        .where({ cohort_id: req.params.id })
        .then(students => {
            if (students.length > 0) {
                res.status(200).json(students);
            } else {
                res.status(404).json({ error: 'No Students found for that Cohort ID.' });
            }
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not load students or cohorts. Try again.' });
        });
})

server.get('/api/cohorts/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .then(cohort => {
            if (cohort.length > 0) {
                res.status(200).json(cohort);
            } else {
                res.status(404).json({ error: 'There was no Cohort found with that ID.' });
            }
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not load cohorts. Try again.' });
        });
})

server.get('/api/cohorts/', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res.status(200).json(cohorts);
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not load cohorts. Try again.' });
        });
})

server.post('/api/cohorts/', (req, res) => {
    db('cohorts')
        .insert(req.body)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not add cohorts. Please include a name.' });
        });
})

server.listen(5000, () => console.log('server running on 5000'));