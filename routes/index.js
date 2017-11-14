var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'bimbel_nodejs'
});
connection.connect(function(err){
    if (!err) {
        console.log("Database is connected..\n");
    } else {
        console.log("Error connecting database..\n");
        console.log(err);
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next)
{
	console.log(req.session.namaSession);
	res.render('login',{ title:'Login'})
});

router.get('/profile', function(req, res, next)
{	
	res.render('profile',{ title:'Profile'})
});
router.get('/register', function(req, res, next)
{	
	res.render('register',{ title:'Register'})
});

router.get('/news',function(req, res, next)
{
    res.render('news',{title:'news'})
});

router.get('/footer',function(req, res, next)
{
    res.render('footer',{title:'footer'})
});

router.get('/news1',function(req, res, next)
{
    res.render('news1',{title:'news'})
});

router.get('/logout', function(req, res, next) {
    req.session = null;
    res.redirect('/');
});

// POST
router.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM tb_user WHERE username = ?', [email], function(error, results, fields) {
        //console.log(results);
        if (error) {
            // console.log("error ocurred",error);
            res.send({message: "Email and password wrong1"
                    })
        } else {
            console.log('The results is: ', results);

            // buat generate pass secara async
            // const saltRounds = 10;
   			// bcrypt.genSalt(saltRounds, function(err, salt) {
			//     bcrypt.hash(password, salt, function(err, hash) {
			//         // Store hash in your password DB.
			//         console.log('dari body '+hash);
			//     });
			// });
            if (results.length > 0) {
            	// langsung compare dri body dengan db secara async
            	bcrypt.compare(password, results[0].password, function(err, ress) {
    				console.log(ress);
    				if(ress){
    					req.session.loggedIn = true;
                    	req.session.namaSession = results[0].username;
                    	req.session.idUser = results[0].id;
                    	req.session.lvlUser = results[0].level;
                    	console.log(req.session.namaSession);
                    	res.redirect('/');
                	}else{
                		res.send({message: "Email and password wrong2"
                    	});
                	}
				});
            } else {
                res.send({message: "Email and password wrong3"
                });
            }
        }
    });
});

router.post('/register', function(req, res){

});

module.exports = router;
