//express config
const express = require('express')
const app = express();

const PORT = process.env.PORT || '5000'
const path = require('path')
//connect database
const connectDB = require('./config/db')
connectDB()
//init middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//host local files
app.use(express.static(path.join(__dirname, 'dist/VideoPlayer')))

//init routes
app.use('/api', require('./router/api/api'))

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/VideoPlayer/index.html'))
})

app.listen(PORT, () => console.log(`Server is listening at ${PORT}`))