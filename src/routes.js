const express = require('express');
const routes = express.Router();
const UserController = require('./app/controllers/UserController');
const ProjectController = require('./app/controllers/ProjectController');

const authMiddleware = require('./app/middlewares/auth');


routes.post('/users', UserController.create);
routes.post('/users/auth', UserController.auth);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.use(authMiddleware);
routes.get('/projects', ProjectController.work);
routes.get('/users', UserController.index);

module.exports = routes;