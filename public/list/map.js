onLoad()

const map = L.map('myMap').setView([0, 0], 2);
const atribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMao</a> contributions';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { atribution })

tiles.addTo(map)



async function onLoad() {
    const result = await fetch('/logs')
    const data = await result.json()
    let latestEntry = data[0]
    for (let i = 0; i < data.length; i++) {
        if (latestEntry.timestamp < data[i].timestamp) {
            latestEntry = data[i]
        }
    }
    for (let i = 0; i < data.length; i++) {
        const marker = L.marker([data[i].lat, data[i].lon]).addTo(map)
        const weather = data[i].weather
        const air_quality = data[i].air_quality
        let txt = `The weather here is ${weather.weather[0].description}.
        The temperature is ${weather.main.temp}° but feels like ${weather.main.feels_like}°.
        Max temperature: ${weather.main.temp_max}°.
        Min temperature: ${weather.main.temp_min}°.
        Wind speed is ${weather.wind.speed} m/s.
        
        The air quality is ${data[i].aq}!
        The PM10 is ${air_quality.list[0].components.pm10}.
        The PM25 is ${air_quality.list[0].components.pm2_5}`

        marker.bindPopup(txt)
    }

    map.setView([latestEntry.lat, latestEntry.lon], 15)
}
