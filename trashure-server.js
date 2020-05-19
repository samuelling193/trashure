const express = require('express')
const app = express()
const port = 8080
// const pg = require('pg')

app.set(engine, 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})


