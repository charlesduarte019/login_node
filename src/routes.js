const express = require('express');
const routes = express.Router();
const UserController = require('./app/controllers/UserController');
const ProjectController = require('./app/controllers/ProjectController');

const authMiddleware = require('./app/middlewares/auth');


routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.post('/users/auth', UserController.auth);


routes.delete('/users/:id', UserController.delete);
routes.get('/projects', ProjectController.index);


routes.use(authMiddleware);
routes.put('/users/:id', UserController.update);
routes.get('/users/:id', UserController.profile);

routes.post('/projects', ProjectController.create);
routes.put('/projects/:id', ProjectController.update);
routes.get('/projects/:id', ProjectController.profile);
routes.delete('/projects/:id', ProjectController.delete);



module.exports = routes;