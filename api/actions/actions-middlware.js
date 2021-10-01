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
async function databaseActon(req, res, next) {
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
function validateAction(res, req, next) {
	const { project_id, description, notes } = req.body;
	if (!project_id && !description && !notes) {
		res.status(400).json({
			message: "Missing required project ID, description and name",
		});
	} else {
		req.project_id = project_id;
		req.description = description;
		req.notes = notes;
		next();
	}
}

module.exports = {
	logger,
	databaseActon,
	validateAction,
};
