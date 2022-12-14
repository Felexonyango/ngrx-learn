import {Router} from 'express'
import {create, deleteLeaveType, getLeaveTypeById, getLeaveTypes, getLeaveTypesUser, updateLeaveTypesTypes} from '../controller/LeaveTypeController'
import { authorize, protect } from "../middleware/auth"
const router = Router();
//admin routes

router.route('/create').post(protect, authorize('admin'),create);
router.route("/admin").get(protect, authorize('admin'), getLeaveTypes)
router.route('/:id').get(protect,  authorize('admin'),getLeaveTypeById)
router.route('/:id').delete(protect,authorize('admin'),deleteLeaveType)
router.route('/:id').patch(protect, authorize('admin'),updateLeaveTypesTypes)
//user routes
router.route("/user").get(protect,getLeaveTypesUser )


export { router as leaveTypeRoutes };