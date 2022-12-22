const canvas = document.querySelector('canvas')
const sumbitBtn = document.getElementById('submitBtn')
canvas.style.height = "360px"
canvas.style.width = "420px"

const c = canvas.getContext('2d')
let mouse = {
    x: undefined,
    y: undefined,
    pressed: false
}

window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect()
    mouse.x = e.x - (rect.x + 1)
    mouse.y = e.y - (Math.floor(rect.y) + 1)
})

window.addEventListener('mousedown', () => {
    c.beginPath()
    mouse.pressed = true
})

window.addEventListener('mouseup', () => {
    c.closePath()
    mouse.pressed = false
})

function draw() {
    requestAnimationFrame(draw)
    if (mouse.pressed) {
        c.strokeStyle = 'red'
        c.lineTo(mouse.x, mouse.y)
        c.stroke()
    }

}
draw()


