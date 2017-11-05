var express = require('express');
var router = express.Router();
var mysql = require('mysql');

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
	res.render('register',{ title:'Profile'})
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
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            console.log('The resuls is: ', results);
            if (results.length > 0) {
                if (results[0].password == password) {
                    req.session.loggedIn = true;
                    req.session.namaSession = results[0].username;
                    req.session.idUser = results[0].id;
                    req.session.lvlUser = results[0].level;
                    console.log(req.session.namaSession);
                    res.redirect('/');
                } else {
                    res.send({message: "Email and password wrong"
                    });
                }
            } else {
                res.send({message: "Email and password wrong"
                });
            }
        }
    });
});

module.exports = router;
