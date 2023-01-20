import {Router} from 'express'
import {admindeleteleave, adminupdateleave, leaveHistory, create, deleteleave, getleaveById, getleaveByIdByAdmin, updateleave, userleaves} from '../controller/leaveController'
import { authorize, protect } from "../middleware/auth"
const router = Router();
//user routes

router.route('/').post(protect,  create);
router.route("/").get(protect, userleaves)
router.route('/:id').get(protect, getleaveById)
router.route('/:id').delete(protect,deleteleave)
router.route('/:id').patch(protect, updateleave)
//admin routes
router.route("/admin/all").get(protect, authorize(['admin']), leaveHistory)
router.route('/admin/:id').get(protect,authorize(['admin']),getleaveByIdByAdmin)
router.route('/admin/:id').delete(protect,authorize(['admin']),admindeleteleave)
router.route('/admin/:id').patch(protect, authorize(['admin']),adminupdateleave)

export { router as leaveRoutes };