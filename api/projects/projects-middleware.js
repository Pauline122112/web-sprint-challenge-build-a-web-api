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
const databaseProject = async (req, res, next) => {
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
const validateProject = (req, res, next) => {
	const { name, description, completed } = req.body;
	try {
		if (
			!name ||
			!description ||
			!completed ||
			!name.trim() ||
			!description.trim()||
            !completed.trim()
		) {
			res.status(400).json({
				message:
					"missing required name, description or completion",
			});
		} else {
			next();
		}
	} catch (err) {
		next(err)
	}
};


module.exports = {
	logger,
	databaseProject,
	validateProject,
};
