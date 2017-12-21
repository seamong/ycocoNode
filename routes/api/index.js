var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});
router.get('/form', function (req, res) {
  res.render('form', {title: 'Express'});
});
router.post('/date', function (req, res) {
  res.render('date', {title: 'Express'});
})

module.exports = router;