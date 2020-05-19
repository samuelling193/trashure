const express = require('express')
const app = express()
const port = 8080
// const pg = require('pg')

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/myitems', (req,res)=>{
    res.render('view-my-items')
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})


