// Write your "actions" router here!
// Write your "projects" router here!
const express = require("express");
const Actions = require("../actions/actions-model");
const { databaseActon, validateAction } = require('./actions-middlware')

const router = express.Router();

//check http://localhost:9000/api/projects to test work
//Using httpie or Postman

//GET-
router.get("/", (req, res, next) => {
	Actions.get()
		.then((action) => {
			res.status(200).json(action);
		})
		.catch(next);
});

//GET
router.get("/:id", databaseActon, (req, res) => {
	res.status(200).json(req.action);
});

// //POST

router.post("/", validateAction, (req, res, next) => {
	Actions.insert(req.body)
		.then((action) => {
			res.status(201).json(action);
		})
		.catch(next);
});

//PUT
router.put("/:id", validateAction, (req, res, next) => {
	Actions.update(req.params.id, req.body)
		.then(() => {
			return Actions.getById(req.params.id);
		})
		.then((action) => {
			res.status(200).json(action);
		})
		.catch(next);
});

//DELETE
router.delete("/:id", databaseActon, (req, res, next) => {
	console.log(req.theTruth);
	Actions.remove(req.params.id)
		.then(() => {
			res.status(200).json({ message: "This action has been demolished" });
		})
		.catch(next);
});

//For errors only
router.use((err, req, res, next) => {
	// eslint-disable-line
	res.status(err.status || 500).json({
		customMessage: "something tragic inside projects router",
		error: err.message,
		stack: err.stack,
	});
});

module.exports = router;
