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
  getPendingLeaveById,
  deletePendingLeaveById,
  updatePendingLeave,
  Approvedleaves,
  PendinLeaves,
  ApprovedleavesByUser,
  PendinLeavesByUser
} from "../controller/leaveController";
import { authorize, protect } from "../middleware/auth";
const router = Router();
router.route("/").post(protect, authorize(['user',"admin"]), create);
router.route("/").get(protect, authorize(['user']), userleaves);
router.route("/:id").get(protect, authorize(['user','admin']), getleaveById);
router.route("/:id").delete(protect, authorize(['user','admin']), deleteleave);
router.route("/:id").post(protect,authorize(['user','admin']), updateleave);

router.route("/admin/all").get(protect, authorize(["admin"]), leaveHistory);
router.route("/admin/approved").get(protect, authorize(["admin"]),Approvedleaves);
router.route("/user/approved").get(protect, authorize(["user"]),ApprovedleavesByUser);
router.route("/approve/:id").post(protect, authorize(["admin"]), approveLeave);

router.route("/approved/:id").get(protect,authorize(['admin','user']),getApprovedLeaveById)
router.route('/approved/:id').delete(protect,authorize(['admin','user']),deleteApprovedLeaveById)
router.route('/approved/:id').patch(protect,authorize(['admin','user']),updateApprovedLeave)

//pending leaves
router.route("/user/pending").get(protect, authorize(["user"]),PendinLeavesByUser);
router.route("/admin/pending").get(protect, authorize(["admin"]),PendinLeaves);
router.route("/pending/:id").get(protect,authorize(['admin','user']),getPendingLeaveById)
router.route('/approved/:id').delete(protect,authorize(['admin','user']),deletePendingLeaveById)
router.route('/approved/:id').patch(protect,authorize(['admin',]),updatePendingLeave)


export { router as leaveRoutes };
