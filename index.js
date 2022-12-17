const express = require('express')
const app = express()

app.listen(5500, () => {
 console.log('it is listening')
})

app.use(express.static('public'))

app.post('/position', (req, resp) => {

})
