import { Router } from 'express';
import { CampusController } from '../controller/CampusController';
import { isAuthenticated } from '../middlewares/isAuthenticated';


const campusRoutes = Router();
const campusController = new CampusController();

campusRoutes.post('/campus', isAuthenticated, campusController.postCampus);
campusRoutes.get('/campus/all/:id', isAuthenticated, campusController.getAllCampusByUserId);
campusRoutes.get('/campus/:id', isAuthenticated, campusController.getCampusByUserId);
campusRoutes.put('/campus/:id', isAuthenticated, campusController.putCampus);
campusRoutes.delete('/campus/:id', isAuthenticated, campusController.deleteCampus);

export { campusRoutes };