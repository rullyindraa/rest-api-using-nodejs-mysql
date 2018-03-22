const express = require('express');
const router = express.Router();
const con = require('./con');

router.get('/', function (req, res, next) {
  con.query('select * from students', function (err, rows, fields) {
    if (err) {
      res.send(JSON.stringify({
        "status": 500,
        "error": err
      }));
    } else {
      res.send(JSON.stringify({
        "status": 200,
        "data": rows
      }));
    }
  });
});

router.post('/input-student', function (req, res) {
  var inputData = {
    student_id: req.body.student_id,
    admission_date: req.body.admission_date,
    name: req.body.name,
    address: req.body.address,
    date_of_birth: req.body.date_of_birth,
    gender: req.body.gender,
    major: req.body.major,
    student_email: req.body.student_email
  };

  con.query('insert into students set ?', inputData, function (err, results, fields) {
    if (err) {
      res.send(JSON.stringify({
        "status": 500,
        "error": err
      }));
    } else {
      res.send(JSON.stringify({
        "status": 200,
        "data": results
      }));
    }
  });
});

router.delete('/delete/:id', function (req, res) {
  con.query('delete from students where student_id = ?', [req.params.id], function (err, results) {
    if (err) {
      res.send(JSON.stringify({
        "status": 500,
        "error": err 
      }));
    } else {
      res.send(JSON.stringify({
        "status": 200,
        "data": results
      }));
    }
  });
});

router.get('/:id', function(req, res, next) {
  con.query('select * from students WHERE student_id = ?', [req.params.id], function(err, rows, fields) {
    if (err) {
      res.send(JSON.stringify({
        "status": 500,
        "error": err
      }));
    } else {
      res.send(JSON.stringify({
        "status": 200,
        "data": rows
      }));
    }
  });
});

router.put('/edit', function (req, res) {
  con.query('update students set admission_date = ?, name = ?, address = ?, date_of_birth = ?, gender = ?, major = ?, student_email = ? where student_id = ?',
    [
      req.body.admission_date,
      req.body.name,
      req.body.address,
      req.body.date_of_birth,
      req.body.gender,
      req.body.major,
      req.body.student_email,
      req.body.student_id,
    ],
    function (err, results, fields) {
      if (err) {
        res.send(JSON.stringify({
          "status": 500,
          "error": err 
        }));
      } else {
        res.send(JSON.stringify({
          "status": 200,
          "data": results
        }));
      }
    }
  ); 
});

module.exports = router;