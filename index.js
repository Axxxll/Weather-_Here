const express = require('express')
const Datastore = require('nedb')
const app = express()
const database = new Datastore('database.db')

database.loadDatabase()

const port = 5500

app.listen(port, () => {
    console.log(`it is listening at http://localhost:${port}`)
})

app.use(express.static('public'))
app.use(express.json())

app.post('/position', (req, res) => {
    const data = req.body
    const timestamp = Date.now()
    data.timestamp = timestamp
    database.insert(data)
    res.json({
        status: 'succsess',
        latitude: data.lat,
        longitude: data.lon,
        input: data.input,
    })
})

app.get('/logs', (req, res) =>{
    database.find( {}, (err, responce) => {
        if(err) {
            res.end()
            return
        }
        else {
            res.json(responce)
        }
    })
})
