import { Router } from "express";
import {

  leaveHistory,
  create,
  deleteleave,
  getleaveById,
  updateleave,
  userleaves,
  approveLeave,

  getApprovedLeaveById,
  deleteApprovedLeaveById,
  updateApprovedLeave,
  getPendinLeaves,
  getPendingLeaveById,
  deletePendingLeaveById,
  updatePendingLeave,
  getAllapprovedLeaves
} from "../controller/leaveController";
import { authorize, protect } from "../middleware/auth";
const router = Router();
router.route("/").post(protect, authorize(['user',"admin"]), create);
router.route("/").get(protect, authorize(['user']), userleaves);
router.route("/:id").get(protect, authorize(['user','admin']), getleaveById);
router.route("/:id").delete(protect, authorize(['user','admin']), deleteleave);
router.route("/:id").patch(protect,authorize(['user','admin']), updateleave);
router.route("/admin/all").get(protect, authorize(["admin"]), leaveHistory);

  //approved leaves
router.route("/:id").post(protect, authorize(["admin"]), approveLeave);
router.route("/approvedleaves").get(protect,authorize(['admin']), getAllapprovedLeaves)
router.route("/approved/:id").get(protect,authorize(['admin']),getApprovedLeaveById)
router.route('/approved/:id').delete(protect,authorize(['admin']),deleteApprovedLeaveById)
router.route('/approved/:id').patch(protect,authorize(['admin']),updateApprovedLeave)

//pending leaves

router.route("/pending").get(protect, authorize(["admin"]), getPendinLeaves);
router.route("/pending/:id").get(protect,authorize(['admin']),getPendingLeaveById)
router.route('/approved/:id').delete(protect,authorize(['admin']),deletePendingLeaveById)
router.route('/approved/:id').patch(protect,authorize(['admin']),updatePendingLeave)


export { router as leaveRoutes };
