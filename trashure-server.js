const express = require('express')
const app = express()
const port = 8080
const db = require('./models/config')
// const user = require('./models/users')
// const pg = require('pg')
// installed bcrypt, express-session, passport-local, bodyParser
const bcrypt = require('bcrypt')
const saltRounds = 10;
const session = require('express-session')
// dependencies for login, installed passport, morgan dependencies for login
const passport = require('passport')
const Strategy = require('passport-local').Strategy;

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

app.use(express.static('public'))

passport.use(new Strategy(
    function(username, password, cb) {
        db.query('select * from users where username = $1;', [username]).then(function(dbRes){
            cb(null, dbRes.rows[0])
        })
}));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});
  
passport.deserializeUser(function(id, cb) {
    db.query('select * from users where id = $1;', [id]).then(function(dbRes){
        cb(null, dbRes.rows[0])
    })
});

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res)=>{
    res.render('log-in')
})

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});


app.get('/signup', (req, res)=>{
    res.render('sign-up')
})

app.post('/signup', (req, res)=>{

    const hash = bcrypt.hashSync(req.body.password, 10);

    db.query(
        'insert into users (username, name, email, password, avatar_url) values ($1, $2, $3, $4, $5)', [req.body.username, req.body.name, req.body.email, hash, req.body.avatar_url], (err, dbRes)=>{

            res.json({
                username: req.body.username, 
                name: req.body.name, 
                email: req.body.email,
                avatar_url: req.body.avatar_url
            })
            
            res.redirect('/')
    })

})

app.get('/myitems', (req,res)=>{
    res.render('view-my-items')
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})
