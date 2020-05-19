const express = require('express')
const app = express()
const port = 8080
// const pg = require('pg')

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/login', (req, res)=>{
    res.render('log-in')
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})


