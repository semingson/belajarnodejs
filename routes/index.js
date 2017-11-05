var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next)
{
	res.render('login',{ title:'Login'})
});

router.get('/profile', function(req, res, next)
{	
	res.render('profile',{ title:'Profile'})
}	);
router.get('/register', function(req, res, next)
{	
	res.render('register',{ title:'Profile'})
}	);


module.exports = router;
