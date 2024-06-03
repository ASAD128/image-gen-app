const express = require('express')
const { generateMeta, generateImage } = require('./controllers/openaiController')

const app = express()
const port = 3000


// Middleware
app.use(express.json())
app.use(express.static("public"))

// routes
/*app.get('/', (req, res) => {
    res.send('Hello World!')
})*/
// app.get('openai/welcome', { "Tile": "welcome to express app"})
app.post('/openai/meta', generateMeta)
app.post('/openai/image', generateImage)


app.listen(port, () => {
    console.log(`Express app listening on port ${port}`)
})