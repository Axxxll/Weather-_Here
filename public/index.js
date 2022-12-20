let lat;
let lon;

// document.getElementById('input').value
const submitBtn = document.getElementById('submitBtn')
navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude
    lon = position.coords.longitude
    updateHtml()
    submitBtn.addEventListener('click', async () => {
        if (document.getElementById('input').value) {
            const input = document.getElementById('input').value
            document.getElementById('input').value = ''
            const data = { lat, lon, input}
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
        }
        else {
            alert('input fieled is empty')
        }
    })
})

function updateHtml() {
    document.getElementById('lat').innerHTML = lat
    document.getElementById('lon').innerHTML = lon
}


