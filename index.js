const express = require('express')
const Datastore = require('nedb')
const fetch = require('node-fetch')
require('dotenv').config()

const app = express()
const database = new Datastore('database.db')

database.loadDatabase()

const port = procces.env.port || 5500

app.listen(port, () => {
    console.log(`it is listening at http://localhost:${port}`)
})

app.use(express.static('public'))
app.use(express.json())

app.post('/position', (req, res) => {
    const data = req.body
    const timestamp = Date.now()
    const lat = data.lat
    const lon = data.lon
    data.timestamp = timestamp
    database.findOne({ "lat": lat, "lon": lon }, (err, doc) => {
        if (doc) {
            database.update(doc, data)
        }
        else {
            database.insert(data)
        }
    })


    res.json({
        status: 'succsess',
        latitude: data.lat,
        longitude: data.lon,
        input: data.input,
    })
})

app.get('/logs', (req, res) => {
    database.find({}, (err, responce) => {
        if (err) {
            res.end()
            return
        }
        else {
            res.json(responce)
        }
    })
})

app.get('/weather/:lat/:lon', async (req, res) => {
    const lat = req.params.lat
    const lon = req.params.lon
    const api_key = process.env.api_key
    const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
    const weather_responce = await fetch(weather_url)
    const weather_body = await weather_responce.json()

    const aq_url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`
    const aq_responce = await fetch(aq_url)
    const aq_body = await aq_responce.json()

    const data = {
        weather: weather_body,
        air_quality: aq_body
    }
    res.json(data)
})


