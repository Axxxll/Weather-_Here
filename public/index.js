let lat;
let lon;

// document.getElementById('input').value
const submitBtn = document.getElementById('submitBtn')
navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude
    lon = position.coords.longitude
    updateHtml()
    getWeather(lat, lon)
    submitBtn.addEventListener('click', async () => {
            const data = { lat, lon}
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
    })
})

function updateHtml() {
    document.getElementById('lat').innerHTML = lat
    document.getElementById('lon').innerHTML = lon
}

async function getWeather(lat, lon) {
    const api_url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
    const responce = await fetch(api_url)
    console.log(responce)
}


