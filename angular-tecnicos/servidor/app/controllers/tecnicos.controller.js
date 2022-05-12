var mongoose = require("mongoose");

var Tecnico = require("../models/tecnicos.model");

var tecnicosController = {};

tecnicosController.list = (req,res) => {
    console.log("Entre en los tecnicos, ubicate nena");
    Tecnico.find({}).skip(1).exec((err,tecnicos) => {
        if(err) {
            console.log("Error:",err);
            return;
        }
        res.send(tecnicos);
    })
}

tecnicosController.show = (req,res) => {
    Tecnico.findOne({_id: req.params._id}).exec((err,tecnicos) => {
        if(err) {
            console.log("Error:",err);
            return;
        }
        res.send(tecnicos);
    })
}

tecnicosController.update = (req, res) => {
    let factura = false;
    if(req.body.importe != 0) {
        factura = true;
    }
    Tecnico.findByIdAndUpdate(req.params._id, {$set: {
        usuario: req.body.usuario,
        password: req.body.password,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        telefono: req.body.telefono,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin
    }},{new:false,runValidators:true},
    (err, articulo) => {
        if(err) {
            var mensaje= (JSON.stringify(err.errors,null,"\t"));
            res.send(mensaje);
        }
        else {
            res.send({"mensaje": "Registro grabado correctamente"});
        }
    });
}

tecnicosController.create = function(req,res) {
    console.log("entre en create");
    Tecnico.find({}).sort({_id:-1}).limit(1).exec(function(err,nuevoArticulo){
        
        if(err) {console.log('Error:',err);return;}
        nuevoArticulo[0].usuario = nuevoArticulo[0].password = nuevoArticulo[0].nombre = nuevoArticulo[0].apellidos = nuevoArticulo[0].telefono = nuevoArticulo[0].fecha_inicio = nuevoArticulo[0].fecha_fin = '' ;
        nuevoArticulo[0]._id++;

        res.send(nuevoArticulo);
    });
};

tecnicosController.grabar = function(req,res) {
    console.log("entrando al grabar");
    var tarea = new Tecnico({
        _id: req.body._id,
        usuario: req.body.usuario,
        password: req.body.password,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        telefono: req.body.telefono,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin
    });
    tarea.save(function(err) {
        if (err){
            console.error(err);
            return;
        }
    });
};

tecnicosController.delete = function(req,res) {
    Tecnico.findByIdAndDelete({_id: req.params._id})
    .exec(function(err) {
        console.log(req.params.id);
        if (err) {console.log('Error: ',err);return;}
    });
}

tecnicosController.validar = function(req, res) {
    console.log("Entre en validar",req.body);
    Tecnico.find({usuario : req.body.usuario,password : req.body.password}).exec(function(err, tecnico) {
        if (err) { console.log('Error:', err); return; }
        console.log("Datos del tecnico:",tecnico);
        res.send(tecnico);
    });
};

module.exports = tecnicosController;