const express = require('express')
// const { logger } = require('./projects/projects-middleware')
const helmet = require('helmet')
const cors = require('cors')

const server = express()

server.use(express.json())

server.use(cors())
// server.use(logger)
server.use(helmet())

server.get('/', (req, res) => {
    res.send('<h1>API sprint challenge<h1>')
})

server.get('/api', (req, res) => {
    res.json({ message: 'Api is working'})
})

server.use((err, req, res, next) => {
    res.status(500).json({
        error: err.message,
        message: 'Something is wrong',
    })
})


module.exports = server
