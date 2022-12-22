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
            const canvas = document.querySelector('canvas')
            const drawing = canvas.toDataURL()
            const c = canvas.getContext("2d")
            c.clearRect(0, 0, canvas.width, canvas.height)
            document.getElementById('input').value = ''
            const data = { lat, lon, input, drawing}
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


