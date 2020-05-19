const express = require('express')
const app = express()
const port = 8080
const db = require('./models/config')
// const pg = require('pg')
// installed bcrypt, express-session, passport-local, bodyParser
const bcrypt = require('bcrypt')
const saltRounds = 10;
var session = require('express-session')

var bodyParser = require('body-parser')

// when you set it from the form  // .json from ajax(axios) request
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

app.use(express.static('public'))

// passport.use(new LocalStrategy(
//     function(username, password, done) {
//         User.findOne({ username: username }, function (err, user) {
//             if (err) { return done(err); }
//             if (!user) {
//             return done(null, false, { message: 'Incorrect username.' });
//             }
//             if (!user.validPassword(password)) {
//             return done(null, false, { message: 'Incorrect password.' });
//             }
//             return done(null, user);
//         });
//     }
// ));


app.get('/login', (req, res)=>{
    res.render('log-in')
})

// Passport strategy for authenticating with a username and password
// user put their username and password
// post method
// compare the data with db, authentication
// login -> session mode (in session branch)
// app.post('/login',
//   passport.authenticate('local'),
//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     res.redirect('/users/' + req.user.username);
// });

// app.post('/login',
// passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));


app.get('/signup', (req, res)=>{
    res.render('sign-up')
})

// insert the data to db when user sign-up
// encrypted password will be stored to db
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


