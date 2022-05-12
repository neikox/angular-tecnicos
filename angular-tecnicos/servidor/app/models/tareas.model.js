var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var tareas = new Schema({
    _id: mongoose.ObjectId,
    tecnico: Number,
    fecha: String,
    cliente: String,
    descripcion: String,
    facturable: Boolean,
    importe: Number
})

module.exports = mongoose.model('Tareas', tareas);