const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.redirect('greetings/master');
});

router.get('/detail', function(req, res, next) {
  res.render('detail', { title: 'Enter Greeting' });
});

router.get('/master', function(req, res, next) {
    res.render('master', { title: 'Greetings' });
});

module.exports = router;
