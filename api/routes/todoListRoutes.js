'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');

  // Rutas para /fligths
  app.route('/flights')
    .get(todoList.list_all_flights)
    .post(todoList.find_flights);

    app.route('/flight')
    .post(todoList.find_flight)

    app.route('/passenger')
    .post(todoList.list_passenger_fligth)

};
