var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log('1');
  res.send('respond with a resource');
});

module.exports = router;
