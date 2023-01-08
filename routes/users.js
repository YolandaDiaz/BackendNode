var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
 //prueba de llamada
router.get('/cosas', (req, res, next) => {
  res.send('Lista de cosas que hay');
})

module.exports = router;
