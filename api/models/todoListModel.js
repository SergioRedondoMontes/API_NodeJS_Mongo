'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
var FlightsSchemaAll = new Schema({
    
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
*/

//creamos el esquema con el nombre Iberia que posterior usaremos en el controlador
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
});

module.exports = mongoose.model('Iberia', FlightsSchema);