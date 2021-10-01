// add middlewares here related to projects
const Projects = require("../projects/projects-model");

//Added a logger but unsure if it's actually needed
function logger(req, res, next) {
	const timestamp = new Date().toLocaleString();
	const method = req.method;
	const url = req.originalUrl;
	console.log(`[${timestamp}] ${method} to ${url}`);
	next();
}

//Created a database project function
async function databaseProject(req, res, next) {
	try {
		const project = await Projects.get(req.params.id);
		if (!project) {
			res.status(404).json({
				message: `id not found`,
			});
		} else {
			req.project = project;
			next();
		}
	} catch (err) {
		res.status(500).json({
			message: "problem finding user",
		});
	}
}

//Created a validation function
function validateProject(res, req, next) {
if (!req.body.name || !req.body.description || req.body.completed == null) {
	next({ status: 400, message: "missing required text field" });
} else {
	next();
}
}

module.exports = {
	logger,
	databaseProject,
	validateProject,
};
