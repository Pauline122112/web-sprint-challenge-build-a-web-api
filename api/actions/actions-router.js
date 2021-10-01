// Write your "actions" router here!
// Write your "projects" router here!
const express = require("express");
const Actions = require("../actions/actions-model");
const { databaseAction, validateAction } = require('./actions-middlware')

const router = express.Router();

//check http://localhost:5000/api/projects to test work

//GET-
router.get("/", (req, res, next) => {
	Actions.get()
		.then((action) => {
			res.status(200).json(action);
		})
		.catch(next)
})

//GET
router.get("/:id", databaseAction, (req, res) => {
	res.status(200).json(req.action)
});

// //POST

router.post("/", validateAction, async (req, res, next) => {
	try {
		const newAction = await Actions.insert({
			project_id: req.project_id,
			description: req.description,
			notes: req.notes,
			completed: req.completed,
		});
		res.status(201).json(newAction);
	} catch (err) {
		next(err)
	}
})
	

//PUT
router.put("/:id", validateAction, databaseAction,(req, res, next) => {
		Actions.update(req.params.id, {
		project_id: req.project_id,
		description: req.description,
		notes: req.notes,
		completed: req.completed,
	})
		.then(() => {
			return Actions.get(req.params.id)
		})
		.then((action) => {
			res.status(200).json(action)
		})
		.catch(next)

})


        // const changes = req.body;
		// 		Actions.update(req.params.id, changes, { name: req.name })
		// 			.then(() => {
		// 				return Actions.getById(req.params.id, changes);
		// 			})
		// 			.then((action) => {
		// 				res.status(200).json(action);
		// 			})
		// 			.catch(next);
//DELETE
router.delete("/:id", databaseAction, (req, res, next) => {
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
        
	})
    next()
})

module.exports = router;
