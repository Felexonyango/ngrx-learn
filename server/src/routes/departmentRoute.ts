import {Router} from 'express'
import { authorize, protect } from "../middleware/auth"
import { create, departments } from '../controller/departmentController';
const router = Router();
//user routes

//admin routes
router.route("/").post(protect, authorize('admin'),create)
router.route("/").get(protect, authorize('admin'), departments)


export { router as departmentRoutes };