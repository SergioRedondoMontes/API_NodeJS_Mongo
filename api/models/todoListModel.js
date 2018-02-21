'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var FlightsSchema = new Schema({
    ciudad: {
        type: String,
        required: 'Faltan parametros'
    },
    vuelos_disponibles: [{
        type : Array,
        num_vuelo: Number,
        origen:String, //puede ponerse que es de tipo 'ciudad' para hacer referencia a la raiz ciudad
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