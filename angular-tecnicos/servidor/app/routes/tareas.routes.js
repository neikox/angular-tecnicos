var express = require("express");
var router = express.Router();
const tareas = require("../controllers/tareas.controller");

router.get("/:tecnico", tareas.list);

router.get("/ficha/nueva", tareas.create);

router.post("/nueva", tareas.grabar);

router.get("/ficha/:_id", tareas.show);

router.post("/save/:_id", tareas.update);

router.get("/borrar/:_id", tareas.delete);

router.get("/stats/show", tareas.stats);

module.exports = router;