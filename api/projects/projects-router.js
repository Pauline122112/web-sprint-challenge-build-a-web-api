// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const { databaseProject, validateProject } = require("./projects-middleware");

const router = express.Router();

//check http://localhost:9000/api/projects to test work
//Using httpie or Postman

//GET-
router.get("/", (req, res, next) => {
	Projects.get()
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch(next);
});

//GET
router.get("/:id", databaseProject, (req, res) => {
	res.status(200).json(req.project);
});

//GET
router.get("/:id/actions", async (req, res, next) => {
	try {
		const action = await Projects.getProjectActions(req.params.id);
		res.json(action);
	} catch (err) {
		next(err);
	}
});

//POST

router.post("/", validateProject, async (req, res, next) => {
	try {
		const newProject = await Projects.insert({
			name: req.name,
			description: req.description,
			completed: req.completed,
		});
		res.status(201).json(newProject);
	} catch (error) {
		next(error);
	}
});

//PUT
router.put("/:id", validateProject, (req, res, next) => {
	Projects.update(req.params.id, req.body)
		.then(() => {
			return Projects.getById(req.params.id);
		})
		.then((project) => {
			res.status(200).json(project);
		})
		.catch(next);
});

//DELETE
router.delete("/:id", databaseProject, (req, res, next) => {
	console.log(req.theTruth);
	Projects.remove(req.params.id)
		.then(() => {
			res.status(200).json({ message: "The project has been demolished" });
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
