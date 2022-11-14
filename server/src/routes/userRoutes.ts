import { Router } from 'express';
import { deleteUserById, getAllUsers, getUserById, UpdateUser } from '../controller/userController';

import { authorize, protect } from "../middleware/auth"

const router = Router();


//route  admin routes
router.route('/getUsers').get(protect, authorize("admin"),  getAllUsers);

router.route('/user/:id').get(protect, authorize("admin"),  getUserById);
router.route('/user/:id').delete(protect, authorize("admin"), deleteUserById);
router.route('/updateUser/:id').patch(protect, authorize("admin"), UpdateUser);




export { router as userRoutes };
