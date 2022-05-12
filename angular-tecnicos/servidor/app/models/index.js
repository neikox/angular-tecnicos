const dbConfig = require("../config/db.config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const dbTareas = {};
dbTareas.mongoose = mongoose;
dbTareas.url = dbConfig.url;
dbTareas.tareas = require("./tareas.model.js")(mongoose);

const dbTecnicos = {};
dbTecnicos.mongoose = mongoose;
dbTecnicos.url = dbConfig.url;
dbTecnicos.tareas = require("./tecnicos.model.js")(mongoose);

module.exports = dbTareas, dbTecnicos;