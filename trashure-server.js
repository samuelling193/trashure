const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const db = require('./models/config')
const methodOverride = require('method-override')
// const convertDate = require('./models/convert-date')
// const user = require('./models/users')
// const pg = require('pg')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const session = require('express-session')
const passport = require('passport')
const Strategy = require('passport-local').Strategy;
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')

app.use(express.static('public'))

passport.use(new Strategy(
    function(username, password, cb) {
        db.query('select * from users where username = $1;', [username]).then(function(dbRes){
            let hash = dbRes.rows[0].encrypted_password
            if(bcrypt.compareSync(password, hash)){
                cb(null, dbRes.rows[0])
        }
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


app.get('/', (req, res) => {
    res.render('index', { user: req.user })
})

app.get('/login', (req, res)=>{
    res.render('log-in')
})

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});


app.get('/signup', (req, res) => {
    res.render('sign-up')
})

app.post('/signup', (req, res) => {

    const hash = bcrypt.hashSync(req.body.password, 10);

    db.query(
        'insert into users (username, name, email, encrypted_password, avatar_url) values ($1, $2, $3, $4, $5)', [req.body.username, req.body.name, req.body.email, hash, req.body.avatar_url], (err, dbRes) => {

            res.redirect('/login')
        })
})

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
});

app.post('/reservation/delete', (req, res) => {
    db.query('delete from reservations where item_id = $1;', [req.body.item_id])
    db.query('update trashure_items SET status = $1 where id = $2;', ['available', req.body.item_id])
    res.redirect('/myitems')
})

app.post('/reservation', (req, res) => {
    db.query('select * from trashure_items where id = $1', [req.body.item_id], (err, items) => {
        db.query('insert into reservations (owner_id, requester_id, item_id, request_date, request_time) VALUES ($1, $2, $3, $4, $5);', 
        [items.rows[0].owner_id, req.user.id, req.body.item_id, items.rows[0].pickup_date, items.rows[0].pickup_start_time])
    })
    db.query('update trashure_items SET status = $1 where id = $2', ['reserved', req.body.item_id])
    res.redirect('/myitems')
})

app.get('/myitems',ensureLoggedIn('/login'), (req,res) => {
    db.query('select * from trashure_items where owner_id = $1;', [req.user.id], (err, items) => {
        db.query('select * from reservations join trashure_items on (reservations.item_id = trashure_items.id) where requester_id = $1;', [req.user.id], (err, reservations) => {
            res.render('view-my-items', {items: items.rows, reservations: reservations.rows})
        })
    })
})

app.get('/item',ensureLoggedIn('/login'), (req, res) => {
        res.render('new-item')
})

app.post('/item', (req,res) => {
     
    const sql = 'insert into trashure_items (owner_id, name,item_type, lat, long, address, quantity, image_url, pickup_date, expiration_date,pickup_start_time, pickup_end_time, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);'

    // need to get owner_id from db, at the moment it's hard coded
    db.query(sql, [req.user.id, req.body.name, req.body.item_type, req.body.latitude, req.body.longitude, req.body.address, req.body.quantity, req.body.image_url, req.body.pickup_date,req.body.pickup_date, req.body.pickup_start_time,req.body.pickup_end_time], (err,dbRes) => {
        res.redirect('/myitems')
    })
})

app.get('/item/:id', (req,res) => {

    db.query('select * from trashure_items where id = $1;', [req.params.id], (err, dbRes) => {
        res.render('edit-item', { item: dbRes.rows })
    })
})

app.put('/item/:id', (req, res) => {

    const sql = 'update trashure_items set name = $1,item_type = $2, lat = $3, long = $4, address = $5, quantity = $6, image_url = $7, pickup_date = $8,expiration_date = $9, pickup_start_time = $10, pickup_end_time = $11 where id = $12;'

    db.query(sql, [req.body.name, req.body.item_type, req.body.latitude, req.body.longitude, req.body.address, req.body.quantity, req.body.image_url, req.body.pickup_date, req.body.pickup_date, req.body.pickup_start_time,req.body.pickup_end_time, req.params.id], (err,dbRes) => {
        res.redirect('/myitems')

    })
})

app.get('/api/trashure_items', (req, res) => {
    db.query('select * from trashure_items;', (err, dbRes) => {
        res.json(dbRes.rows)
    })
})

app.get('/api/trashure_items/:id', (req, res) => {
    db.query('select * from trashure_items where id =$1;', [req.params.id],     (err, dbRes) => {
        res.json(dbRes.rows)
    })
})

app.get('/api/users/:id', (req, res) => {
    db.query(
        'select * from users where id = $1;', 
        [req.params.id], 
        (err, dbRes) => {
            res.json(dbRes.rows)
    })
})

app.get('/api/reservations/:id', (req, res) => {
    db.query(
        'select * from reservations where item_id = $1;', 
        [req.params.id], 
        (err, dbRes) => {
            res.json(dbRes.rows)
    })
})

app.get('/api/current_user', (req, res) => {
    res.json(req.user)
})

app.listen(port, () => {
    (`listening on ${port}`)
})
