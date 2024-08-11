import { Router } from 'express';
import { CampusController } from '../controller/CampusController';
import { authorize } from '../middlewares/isAuthenticated';


const campusRoutes = Router();
const campusController = new CampusController();

campusRoutes.post('/campus', authorize([1]), campusController.postCampus);
campusRoutes.get('/campus', campusController.getAllCampus);
campusRoutes.get('/campus/:id', authorize([1, 2, 3]), campusController.getCampusById);
campusRoutes.put('/campus/:id', authorize([1]), campusController.putCampus);
campusRoutes.delete('/campus/:id', authorize([1]), campusController.deleteCampus);

export { campusRoutes };