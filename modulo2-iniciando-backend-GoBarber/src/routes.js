const { Router } = require('express');

const SessionController = require('./app/controllers/SessionController');
const UserController = require('./app/controllers/UserController');

const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

module.exports = routes;
