var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Octivault - Stay charged' });
});
/* GET partner page. */
router.get('/partner', function(req, res, next) {
  res.render('partner', { title: 'Partner with Octivault - Stay charged' });
});
/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About OCTI VAULT - Stay charged' });
});
/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Octivault - Stay charged' });
});
router.get('/terms', function(req, res, next) {
  res.render('terms', { title: 'Octivault Terms and Conditions' });
});
router.get('/terms', function(req, res, next) {
  res.render('terms', { title: 'Octivault Terms and Conditions' });
});
router.get('/privacy-policy', function(req, res, next) {
  res.render('privacy-policy', { title: 'Octivault Privacy Policy' });
});
/* GET error page. */
router.get('/*', function(req, res, next) {
  res.render('error', { title: 'Error Octivault' });
});

module.exports = router;
