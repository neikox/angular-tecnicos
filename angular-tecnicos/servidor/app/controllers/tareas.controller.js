var mongoose = require("mongoose");

var Tarea = require("../models/tareas.model");

var tareasController = {};

tareasController.list = (req,res) => {
    console.log("Entre en los tareas, ubicate nena");
    Tarea.find({ tecnico: req.params.tecnico }).exec((err,tareas) => {
        if(err) {
            console.log("Error:",err);
            return;
        }
        res.send(tareas);
    })
}

tareasController.show = (req,res) => {
    console.log("Entre en los show, ubicate nena");
    Tarea.findOne({_id: req.params._id}).exec((err,tareas) => {
        if(err) {
            console.log("Error:",err);
            return;
        }
        res.send(tareas);
    })
}

tareasController.update = (req, res) => {
    let factura = false;
    if(req.body.importe != 0) {
        factura = true;
    }
    Tarea.findByIdAndUpdate(req.params._id, {$set: {
        tecnico: req.body.tecnico,
        fecha: req.body.fecha,
        cliente: req.body.cliente,
        descripcion: req.body.descripcion,
        facturable: factura,
        importe: req.body.importe
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

tareasController.create = function(req,res) {
    console.log("entre en create");
    console.log(req.params);
    Tarea.find({}).sort({_id:-1}).limit(1).exec(function(err,nuevoArticulo){
        
        if(err) {console.log('Error:',err);return;}
        nuevoArticulo[0].fecha = nuevoArticulo[0].descripcion = nuevoArticulo[0].cliente = '' ;
        nuevoArticulo[0].importe = null;
        // nuevoArticulo[0].tecnico = req.params.tecnico;
        nuevoArticulo[0].facturable = false;

        res.send(nuevoArticulo);
    });
};

tareasController.grabar = function(req,res) {
    console.log("entrando al grabar");
    let factura = false;
    if(req.body.importe != 0) {
        factura = true;
    }
    var tarea = new Tarea({
        _id: new mongoose.Types.ObjectId(),
        tecnico: req.body.tecnico,
        fecha: req.body.fecha,
        cliente: req.body.cliente,
        descripcion: req.body.descripcion,
        facturable: factura,
        importe: req.body.importe
    });
    tarea.save(function(err) {
        if (err){
            console.error(err);
            return;
        }
    });
};

tareasController.delete = function(req,res) {
    Tarea.findByIdAndDelete({_id: req.params._id})
    .exec(function(err) {
        console.log(req.params._id);
        if (err) {console.log('Error: ',err);return;}
    });
}

tareasController.stats = function(req,res) {
    Tarea.aggregate(
        [
          {
            $group:
              {
                 _id: { year: { $substr: ["$fecha", 0, 4]}, mes: {$substr: ["$fecha", 5, 2]},tecnico : "$tecnico" },
                total_general: { $sum: "$importe"  },
                cantidad: { $sum: 1 }
              }
          },
          { $set: { "year": "$_id.year" , "mes": "$_id.mes" , "tecnico": "$_id.tecnico" } },
          { $project: { _id:0,year: 1, mes: 1 ,tecnico :1,total_general:1,cantidad :1} },
          { $sort : { year : 1 ,mes :1} }
        ]
     ).exec(function(err, stat) {
        // console.log(req.params._id);
        if (err) {console.log('Error: ',err);return;}
        res.send(stat);
    });
}

module.exports = tareasController;