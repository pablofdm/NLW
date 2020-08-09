import express from 'express'
import ClassesController from './database/controllers.js/ClassesController';
import ConnectionsController from './database/controllers.js/ConnectionsController';

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();



routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);
routes.get('/connections', classesController.index);
routes.post('/connections', connectionsController.create)

export default routes