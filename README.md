NodeJS - MongoDB -----> ADAT_Vuelos

# Introducción

## Modelo

[GitHub](https://github.com/SergioRedondoMontes/API_NodeJS_Mongo/blob/master/api/models/todoListModel.js)



    var FlightsSchema = new Schema({

          num_vuelo: Number,
          origen:{ //puede ponerse que es de tipo 'ciudad' para hacer referencia a la raiz ciudad
              type: String,
              required: 'Faltan parametros'
          }, 
          destino:{
              type: String,
              required: 'Faltan parametros'
          },
          fecha_salida:{
              type: String,
              required: 'Faltan parametros'
          },
          precio:Number,
          plazas_totales:Number,
          plazas_disponibles:Number,
          pasajeros: [{
              dni:String,
              nombre:String,
              plazas_compradas:Number
          }]

      // status: {
      //     type: [{
      //         type: String,
      //         enum: ['pending', 'ongoing', 'completed']
      //     }],
      // default: ['pending']
      // }
    });


## Controlador

[GitHub](https://github.com/SergioRedondoMontes/API_NodeJS_Mongo/blob/master/api/controllers/todoListController.js)

//GET devuelve todos los vuelos

      exports.list_all_flights = function(req, res) {
        Flights.find({},{_id:0, pasajeros: 0}, function(err, flights) {
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


//POST devuelve todos los pasageros de un vuelo

      exports.list_passenger_fligth = function(req, res) {
        var idVuelo = req.body.idVuelo;
        Flights.find({num_vuelo:idVuelo},
          {_id:0, pasajeros: 1}, 
          function(err, flights) {
          if (err)
            res.send(err);
          res.json(flights);
        });
      };


## Rutas

[GitHub](https://github.com/SergioRedondoMontes/API_NodeJS_Mongo/blob/master/api/routes/todoListRoutes.js)



    app.route('/flights')
      .get(todoList.list_all_flights)
      .post(todoList.find_flights);

      app.route('/passenger')
      .post(todoList.list_passenger_fligth)
    };  

