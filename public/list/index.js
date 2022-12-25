onLoad()

async function onLoad() {
    const result = await fetch('/logs')
    const data = await result.json()
    console.log(data)
    for (let i = 0; i < data.length; i++) {
        document.getElementById('ulList').innerHTML += `<li>Lat: ${data[i].lat}° Lon: ${data[i].lon}°</br>
        ${new Date(data[i].timestamp)}`
    }
}