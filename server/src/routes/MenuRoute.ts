import { Router } from 'express';
import {
getAllMenus
} from "../controller/MenuController"
import { authorize, protect } from "../middleware/auth"


const router = Router();


router.route('/all').get(protect, authorize(["admin","user"]),getAllMenus);






export { router as MenuRoutes };
