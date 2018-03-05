NodeJS - MongoDB -----> ADAT_Vuelos

# Introducción

En este tutorial, te ayudaré a crear una API RESTful.

### Tools:
- Node.js
- MongoDB
- Editor de texto (Atom, Sublime, etc)
- Postman


# Instalación

## Primeros pasos
- Abra su terminal y siga los siguientes pasos
- Crear un nombre de carpeta todoListApi  ```mkdir todoListApi ```
- Desplácese a la raíz de la carpeta recién creada  ```cd todoListApi ```
- Crear un paquete. archivo JSON(Package. JSON es un archivo que proporciona la información necesaria a la NMP que le permite identificar el proyecto así como controlar las dependencias del proyecto. )
- Crear un fichero llamado server.js  ```touch server.js```
- Crear una carpeta llamada api  ```mkdir api ```
dentro de esta carpeta llamada api, crear tres carpetas separadas llamadas modelos, rutas y controladores ejecutando
 ```mkdir api/controladores api/modelos api/rutas ```


- Crear todoListController. js en la carpeta api/Controller, todoListRoutes. js en la carpeta Routes, y todoListModel en la carpeta modelo  ```Touch api/Controllers/todoListController. js api/Models/todoListModel. js api/Routes/todoListRoutes. js ```

## Configuración del servidor

- Vamos a instalar Express y nodemon, Express se utilizará para crear el servidor, mientras que nodemon nos ayudará a realizar un seguimiento de los cambios en nuestra aplicación observando los archivos modificados y reiniciar automáticamente el servidor.

```npm install --save-dev nodemon```

```npm install express --save```

-En la correcta instalación, el archivo package.json se modificará para tener los dos paquetes recién instalados.
 1. Abra el archivo package.json y añada esta tarea a la secuencia de comandos *"start": "nodemon server.js"*
 2. Abra el archivo server.js y escriba/copie el código siguiente en él
``` var express = require('express'),
 app = express(),
 port = process.env.PORT || 3000;
 
 app.listen(port);
 
 console.log('todo list RESTful API server started on: ' + port);

 ```
 3. En tu terminal ejectua el siguiente comando ```npm run start  ``` , esto iniciará el servidor y entonces usted verá
   > *todo list RESTful API server started on: 3000*

### Configuración del schema
   En primer lugar, vamos a instalar mongoose ```npm install mongoose --save```
   
   #### ¿Por qué Mongoose?
   Mongoose es lo que usaremos para interactuar con una instancia de MongoDB (Database).
   después de la instalación, abra el archivo todoListModel.js en la carpeta api/Models y escriba el código siguiente en el archivo y guárdelo.
 ```
 'use strict';
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 
 
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
 module.exports = mongoose.model('Iberia', FlightsSchema);
 ```
 
 Del código anterior, requerimos el mongoose en nuestro archivo y, a continuación, creamos un modelo de cómo nuestra colección debe ser.
 Como puede ver, la colección de vuelos (tabla) contendrá un origen de tipo String, un detino de tipo String... además el origen, el destino y la fecha seran parametros obligaorios.
 
 ## Configuración de las rutas
 
 El enrutamiento se refiere a determinar cómo responde una aplicación a una solicitud de cliente para un punto final específico, que es un identificador URI (o ruta de acceso) y un método de solicitud HTTP específico (GET, POST, etc.).
 cada una de nuestras rutas tiene diferentes funciones de manejador de rutas, las cuales son ejecutadas cuando la ruta es igualada.
 A continuación se han definido dos rutas básicas ('/flights ', y '/passenger ') con diferentes métodos
 '/flights ' tiene a los métodos GET y POST, y '/passenger ' tiene solo un método POST.
 Como se puede ver, se requiere el controlador para que cada uno de los métodos de rutas puede llamar a su función de handler respectivos.
 
 ```
 'use strict';
 module.exports = function(app) {
 var todoList = require('../controllers/todoListController');
 
 // Rutas para vuelos
 app.route('/flights')
    .get(todoList.list_all_flights)
    .post(todoList.find_flights);
 
 // Rutas para pasajero
 app.route('/passenger')
    .post(todoList.list_passenger_fligth)
 
 };
 ```
 
 ## Configuración del controlador
 
 Abra el archivo todoListController. js con su editor de texto.
 En este controlador estamos escribiendo 3 funciones diferentes: list_all_flights, list_flights ,list_passenger_fligth.
 Exportaremos cada una de las funciones para que podamos usarlas en nuestras rutas.
 ```
 'use strict';
 
 
 var mongoose = require('mongoose'),
 Flights = mongoose.model('Iberia');//cargamos el model Iberia que definimos el todoListModel
 
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
 
 //TODO POST actualiza un vuelo
 exports.update_flights = function(req, res) {
     var idVuelo = req.body.idVuelo;
     var flights = req.body;
     Flights.findOneAndUpdate({num_vuelo:idVuelo}, flights, {new: true}, function(err, flights) {
         if (err)
            res.send(err);
         res.json(flights);
     });
 };

 ```
 
 ### Poniendo todo junto
 
 Anteriormente, teníamos un código mínimo para que nuestro servidor estuviera en funcionamiento en el archivo server.js. En esta sección vamos a  conectar a nuestro controladores, base de datos, los modelos creados, Body parser y las rutas creadas.
 abrir el archivo Server. js creado hace un rato y seguir los siguientes pasos para poner todo junto.
 Vamos a reemplazar el código en su server.js con el fragmento de código de esta sección.
 1. Conecte su base de datos añadiendo una URL a la "mongoose instance connection"
 2. Cargar el modelo creado -Iberia
 3. Instalar bodyParser y utilizar bodyParser  para analizar el cuerpo de la solicitud entrante en un middleware(es como un conector) antes de los controladores, disponibles bajo la propiedad req.body.
 4. Registramos nuestras routas creadas en el servidor
 
  ```
  
  var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Flights = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser');
  
  // mongoose instance connection url connection
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/adat_vuelos');
  
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  /*app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
  });
  */
  
  var routes = require('./api/routes/todoListRoutes'); //importing route
  routes(app); //register the route
  
  
  app.listen(port);
  
  
  console.log('todo list RESTful API server started on: ' + port);
  
```
5. Arrancar MongoDB Server
Abre un terminal y ejecuta ```mongod```
Esto iniciará su servidor MongoDB y, a continuación, node Server podría conectarse a la instancia de MongoDB. Una vez que su servidor de MongoDB está en ejecución, reinicie su servidor de nodo ejecutando.



# Ejemplos de código

## Modelo

[todoListModel](https://github.com/SergioRedondoMontes/API_NodeJS_Mongo/blob/master/api/models/todoListModel.js)



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

[todoListController](https://github.com/SergioRedondoMontes/API_NodeJS_Mongo/blob/master/api/controllers/todoListController.js)

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

[todoListRoutes](https://github.com/SergioRedondoMontes/API_NodeJS_Mongo/blob/master/api/routes/todoListRoutes.js)



    app.route('/flights')
      .get(todoList.list_all_flights)
      .post(todoList.find_flights);

      app.route('/passenger')
      .post(todoList.list_passenger_fligth)
    };  

