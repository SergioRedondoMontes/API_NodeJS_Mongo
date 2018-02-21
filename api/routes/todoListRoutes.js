'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');

  // todoList Routes
  app.route('/flights')
    .get(todoList.list_all_flights)
    .post(todoList.create_a_flights);

/*
  app.route('/flights/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
    */
};