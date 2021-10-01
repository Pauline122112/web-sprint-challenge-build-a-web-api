// add middlewares here related to actions
const Actions = require("../actions/actions-model");

//Added a logger but unsure if it's actually needed
function logger(req, res, next) {
	const timestamp = new Date().toLocaleString();
	const method = req.method;
	const url = req.originalUrl;
	console.log(`[${timestamp}] ${method} to ${url}`);
	next();
}

//Created a database action function
const databaseAction = async (req, res, next) => {
	try {
		const action = await Actions.get(req.params.id);
		if (!action) {
			res.status(404).json({
				message: `id not found`,
			});
		} else {
			req.action = action;
			next();
		}
	} catch (err) {
		res.status(500).json({
			message: "problem finding user",
		});
	}
}

//Created a validation function
const validateAction = async (req, res, next) => {
		const { project_id, description, notes, completed } = req.body;
		if (!project_id || !project_id) {
			res.status(400).json({
				message: "missing required project id",
			});
		} else if (!description || !description.trim()) {
			res.status(400).json({
				message: "missing required description field",
			});
		} else if (!notes || !notes.trim()) {
			res.status(400).json({
				message: "missing required notes field",
			});
		} else {
			req.project_id = project_id;
			req.description = description.trim();
			req.notes = notes.trim();
			req.completed = completed;
			next();
		}
 }

module.exports = {
	logger,
	databaseAction,
	validateAction,
};
