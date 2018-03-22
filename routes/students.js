const express = require('express');
const router = express.Router();
const axios = require('axios');
const moment = require('moment');
const con = require('./con');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

router.get('/', function (req, res, next) {
  axios.get(config.server.host+'/students-api')
  .then(function (response) {
    res.render('student-list', {title: 'Student List', data: response.data.data});
  })
  .catch(function (err) {
    console.log(err);
  });
});

router.get('/input-student', function (req, res, next) {
  res.render('input-student');
});

router.post('/input-student', function (req, res, next) {
  axios.post(config.server.host+'/students-api/input-student', {
    student_id: req.body.student_id,
    admission_date: req.body.admission_date,
    name: req.body.name,
    address: req.body.address,
    date_of_birth: req.body.date_of_birth,
    gender: req.body.gender,
    major: req.body.major,
    student_email: req.body.student_email
  })
  .then (function (response) {
    if (response.data.status === 200) {
      res.redirect('/');
    }
  })
  .catch (function (err) {
    console.log(err);
  });
});

router.get('/:id', function(req, res) {
  axios.get(config.server.host+'/students-api/'+req.params.id, {
    student_id: req.params.id
  })
  .then(function (response) {
    res.render('edit-student', {
      student_id: response.data.data[0].student_id,
      admission_date: moment(response.data.data[0].admission_date).format('YYYY-MM-DD'),
      name: response.data.data[0].name,
      address: response.data.data[0].address,
      date_of_birth: moment(response.data.data[0].date_of_birth).format('YYYY-MM-DD'),
      gender: response.data.data[0].gender,
      major: response.data.data[0].major,
      student_email: response.data.data[0].student_email
    });
  })
  .catch(function (err) {
    console.log(err);
  });
});

router.post('/edit', function (req, res) {
  axios.put(config.server.host+'/students-api/edit', {
    student_id: req.body.student_id,
    admission_date: req.body.admission_date,
    name: req.body.name,
    address: req.body.address,
    date_of_birth: req.body.date_of_birth,
    gender: req.body.gender,
    major: req.body.major,
    student_email: req.body.student_email
  })
  .then (function (response) {
    if (response.data.status === 200) {
      res.redirect('/');
    }
  })
  .catch (function (err) {
    console.log(err);
  });
})

router.post('/delete/:id', function (req, res) {
  axios.delete(config.server.host+'/students-api/delete/'+req.params.id)
  .then(function (response) {
    if (response.data.status === 200) {
      res.redirect('/students');
    }
  })
  .catch (function (err) {
    console.log(err);
  });
});

module.exports = router;
