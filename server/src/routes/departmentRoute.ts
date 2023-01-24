import {Router} from 'express'
import { authorize, protect } from "../middleware/auth"
import { create, deleteDepartment, getAdminTotals, getUserTotals, getdepartmentById, getdepartments, updateDepartment } from '../controller/departmentController';
const router = Router();
//user routes
router.route("/user").get(protect, getdepartments)
//admin routes
router.route("/").post(protect, authorize(['admin']),create)
router.route("/").get(protect, authorize(['admin']), getdepartments)
router.route('/:id').get(protect,authorize(['admin']),getdepartmentById)
router.route('/:id').delete(protect,authorize(['admin']),deleteDepartment)
router.route('/:id').patch(protect,authorize(['admin']),updateDepartment)
//router.route("/department/total").get(protect, authorize(['admin']), getTotalDepartment)


router.get("/department/total", protect, authorize(['admin']), async (req, res) => {
    try {
      const result = await getAdminTotals(req);
      res.status(200).json({ msg:"successfully retrieved dashboard summary", result });
    } catch (error) {
      res.status(500).json({ msg:error });
    }
  });
  router.get("/user/total", protect, authorize(['user']), async (req, res) => {
    try {
      const result = await getUserTotals(req);
      res.status(200).json({ msg:"successfully retrieved dashboard summary", result });
    } catch (error) {
      res.status(500).json({ msg:error });
    }
  });

export { router as departmentRoutes };