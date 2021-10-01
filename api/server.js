const express = require("express")
const { logger } = require("./projects/projects-middleware")
const helmet = require('helmet')
const cors = require("cors"); //MIDDLEWARE
const projectsRouter = require("./projects/projects-router")
const actionsRouter = require("./actions/actions-router")

// Configured server

const server = require("express")()

server.use(express.json())

server.use(cors())
server.use(helmet())
server.use(logger)


server.use("/api/projects", projectsRouter)
server.use("/api/actions", actionsRouter)

server.get("/", (req, res) => {
	res.send(`<h1>Lambda Projects</h1>`)
});

server.get("/api", (req, res) => {
	res.json({ message: "Api is working" });
});

server.use((err, req, res, next) => {
	// eslint-disable-line
	res.status(500).json({
		error: err.message,
		message: "Something is wrong",
	});
});

module.exports = server
