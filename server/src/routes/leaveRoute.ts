import {Router} from 'express'
import {create, deleteleave, leaveById, userleaves} from '../controller/leaveController'
import { authorize, protect } from "../middleware/auth"
const router = Router();

router.route('/create').post(protect, create);
router.route("/getall").get(protect, userleaves)
router.route('/getleave/:id').get(protect, leaveById)
router.route('/:id').delete(protect,deleteleave)
export { router as leaveRoutes };