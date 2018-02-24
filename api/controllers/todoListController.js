'use strict';


var mongoose = require('mongoose'),
Flights = mongoose.model('Iberia');//cargamos el model Iberia que definimos el todoListModel

//GET devuelve todos los vuelos
  exports.list_all_flights = function(req, res) {
    Flights.find({}, function(err, flights) {
      if (err)
        res.send(err);
      res.json(flights);
    });
  };

//POST devuelve los vuelos que coincidan con los paramentrod de busqueda(origen, destino y fecha)
  exports.find_flights = function(req, res) {
    var ciudad = req.body.ciudad;
    var destino = req.body.destino;
    var fecha = req.body.fecha_salida;
    console.log(req.body);
    Flights.find({origen:ciudad ,destino : destino,fecha_salida : fecha},/*parametros de busqueda*/
        {_id:0, pasajeros: 0},/*datos que no queremos mostrar en el JSON que nos devuelve el result*/
        function(err, result) {
        if (err)
        res.send(err);
      res.json(result);
    });
  };





/*
EXAMPLE POST FIND SOME
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("customers").find({}, { _id: 0, name: 1, address: 1 }).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

db.iberias.findOne({origen:"Madrid","vuelos_disponibles.origen":"Madrid","vuelos_disponibles.destino" : "Barcelona","vuelos_disponibles.fecha_salida" : "12-12-12"})




exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
*/