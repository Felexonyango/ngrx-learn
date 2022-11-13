import { Router } from 'express';
import { update } from '../controller/userController';
// import { update } from "../controller/userController"
import { protect } from "../middleware/auth"
import { updateProfileValidation, validate } from '../validation';

const router = Router();

router.use(protect);

router.route('/:id').patch(updateProfileValidation(), validate, update);

export { router as userRoutes };
