onLoad()

async function onLoad() {
    const result = await fetch('/logs')
    const data = await result.json()
    console.log(data)
    for (let i = 0; i < data.length; i++) {
        const image = document.createElement('img')
        document.getElementById('ulList').innerHTML += `<li>Lat: ${data[i].lat}° Lon: ${data[i].lon}° Statment: ${data[i].input}</li>`
        if (data[i].drawing) {
            image.src = data[i].drawing
            document.getElementById('ulList').append(image)
        }
        else {
            image.alt = "there is no sig"
            document.getElementById('ulList').append(image)
        }
    }
}