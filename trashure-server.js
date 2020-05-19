const express = require('express')
const app = express()
const port = 8080
const db = require('./models/config')
// const pg = require('pg')

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/login', (req, res)=>{
    res.render('log-in')
})

app.get('/signup', (req, res)=>{
    res.render('sign-up')
})

// insert the data when user sign-up
app.post('/signup', (req, res)=>{

    db.query(
        'insert into trashure (username, name, email, password, avatar_url) values ($1, $2, $3, $4, $5)', [req.body.username, req.body.name, req.body.email, req.body.password, req.body.avatar_url], (err, dbRes)=>{

            res.json({
                username: req.body.username, 
                name: req.body.name, 
                email: req.body.email,
                password: req.body.password,
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


