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
		const { id } = req.params
		const project = await Projects.get(id)
		if (project) {
			req.project = project
			next()
		} else {
			next({
				status: 404,
				message: 'project was not found',
			})
		}
		} catch (err) {
			next(err)
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
