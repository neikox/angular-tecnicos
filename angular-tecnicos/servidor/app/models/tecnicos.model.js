var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var tecnicos = new Schema({
    _id: Number,
    usuario: String,
    password: String,
    nombre: String,
    apellidos: String,
    telefono: String,
    fecha_inicio: String,
    fecha_fin: String
})

module.exports = mongoose.model('Tecnicos', tecnicos);