async function onLoad() {
   const result = await fetch('/logs')
   const data = await result.json()
    for (let i = 0; i < data.length; i++) {
        document.getElementById('ulList').innerHTML += `<li>Lat: ${data[i].lat}° Lon: ${data[i].lon}° Statment: ${data[i].input}</li>`
    }
}

onLoad()