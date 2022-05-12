var express = require("express");
var router = express.Router();
const tecnicos = require("../controllers/tecnicos.controller");

router.get("/", tecnicos.list);

router.post("/", tecnicos.validar);

router.get("/fichatecnicos/nuevo", tecnicos.create);

router.post("/nuevo", tecnicos.grabar);

router.get("/fichatecnicos/:_id", tecnicos.show);

router.post("/save/:_id", tecnicos.update);

router.get("/borrar/:_id", tecnicos.delete);

module.exports = router;