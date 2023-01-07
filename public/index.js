let lat;
let lon;

// document.getElementById('input').value
const submitBtn = document.getElementById('submitBtn')
navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude
    lon = position.coords.longitude
    submitBtn.addEventListener('click', async () => {
        const {weather, air_quality, aq} = await getWeather(lat, lon)
        const data = { lat, lon, weather, air_quality, aq }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const responce = await fetch('/position', options)
        const res = await responce.json()
        console.log(res)
        location.href = "/list/map.html"
    })
})

async function getWeather(lat, lon) {
    try {
        const responce = await fetch(`/weather/${lat}/${lon}`)
        const data = await responce.json()
        const weather = data.weather
        const air_quality = data.air_quality
        let aq = ""
        switch (air_quality.list[0].main.aqi) {
            case 1:
                aq = "Good"
                break
            case 2:
                aq = "Fair"
                break
            case 3:
                aq = "Moderate"
                break
            case 4:
                aq = "Poor"
                break
            case 5:
                aq = "Very Poor"
                break
        }
        console.log(data)
        const div = document.getElementById("weather_div")
        const p = document.createElement('p')
        p.innerText = `
    The weather here is ${weather.weather[0].description}.
    The temperature is ${weather.main.temp}° but feels like ${weather.main.feels_like}°.
    Max temperature: ${weather.main.temp_max}°.
    Min temperature: ${weather.main.temp_min}°.
    Wind speed is ${weather.wind.speed} m/s.
    
    The air quality is ${aq}!
    The PM10 is ${air_quality.list[0].components.pm10}.
    The PM25 is ${air_quality.list[0].components.pm2_5}`
        div.appendChild(p)
        return {weather, air_quality, aq}
    }
    catch {
        const div = document.getElementById("weather_div")
        const p = document.createElement('p')
        p.innerText = "No data available!"
        div.appendChild(p)
    }
}


