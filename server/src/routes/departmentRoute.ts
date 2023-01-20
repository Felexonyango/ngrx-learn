import {Router} from 'express'
import { authorize, protect } from "../middleware/auth"
import { create, deleteDepartment, getdepartmentById, getdepartments, updateDepartment } from '../controller/departmentController';
const router = Router();
//user routes
router.route("/user").get(protect, getdepartments)
//admin routes
router.route("/").post(protect, authorize(['admin']),create)
router.route("/").get(protect, authorize(['admin']), getdepartments)
router.route('/:id').get(protect,authorize(['admin']),getdepartmentById)
router.route('/:id').delete(protect,authorize(['admin']),deleteDepartment)
router.route('/:id').patch(protect,authorize(['admin']),updateDepartment)


export { router as departmentRoutes };