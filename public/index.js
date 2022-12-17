let lat;
let lon;

navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude
    lon = position.coords.longitude
    updateHtml()
})

function updateHtml() {
    document.getElementById('lat').innerHTML = lat
    document.getElementById('lon').innerHTML = lon
}

