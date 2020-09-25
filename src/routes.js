const express = require('express');
const routes = express.Router();
const UserController = require('./app/controllers/UserController');
const ProjectController = require('./app/controllers/ProjectController');

const authMiddleware = require('./app/middlewares/auth');


routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.post('/users/auth', UserController.auth);
routes.delete('/users/:id', UserController.delete);

routes.use(authMiddleware);
routes.put('/users/:id', UserController.update);
routes.get('/projects', ProjectController.work);
routes.get('/users/:id', UserController.profile);


module.exports = routes;