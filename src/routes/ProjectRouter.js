const outils = require("../utils/outils.js")
const isAuthenticated = require('../../middleware/authentification.js')
const projectController = require('../controllers/ProjectController.js')

outils.router
    .get("/:id/getProject/:id_project", projectController.FindProject)
    .get("/:id/deleteProject/:id_project",projectController.ProjetDelete)
    .get('/:id/getProject/', projectController.FindAllProject)
    .post("/:id/add", projectController.AddProject)
    .post('/:id/update/:id_project', projectController.UpdateProject)

module.exports = outils.router;