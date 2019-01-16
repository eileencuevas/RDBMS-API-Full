const express = require('express');
const knex = require('knex');

const knexConfig = require('../../knexfile');

const db = knex(knexConfig.development);

const router = express.Router();

router.get('/:id', (req, res) => {
    db('students')
        .leftJoin('cohorts', { 'students.cohort_id' : 'cohorts.id' })
        .select('students.id', 'students.name', 'cohorts.name as cohort')
        .where({ 'students.id': req.params.id })
        .then(student => {
            if (student.length > 0) {
                res.status(200).json(student);
            } else {
                res.status(404).json({ error: 'There was no Student found with that ID.' });
            }
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not load Students. Try again.' });
        });
})

router.get('/', (req, res) => {
    db('students')
        .leftJoin('cohorts', {'students.cohort_id': 'cohorts.id'})
        .select(['students.id', 'students.name', 'cohorts.name as cohort'])
        .then(student => {
            res.status(200).json(student)
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not load Students. Try again.' });
        });
})

router.post('/', (req, res) => {
    db('students')
        .insert(req.body)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not add Students. Please include a name.' });
        });
})

router.put('/:id', (req, res) => {
    db('students')
        .where({ id: req.params.id  })
        .update(req.body)
        .then(success => {
            if (success) {
                res.status(200).json(success);
            } else {
                res.status(404).json({ error: 'No Students found with that ID.' });
            }
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not load Students. Try again.' });
        });
})

router.delete('/:id', (req, res) => {
    db('students')
        .where({ id: req.params.id })
        .del()
        .then(success => {
            if (success) {
                res.status(200).json(success);
            } else {
                res.status(404).json({ error: 'No Student found with that ID.' });
            }
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not load Students. Try again.' });
        });
})

module.exports = router;