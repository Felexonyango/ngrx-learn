import { Router } from 'express';
import {
  login,
  signUp,
  changePassword,
} from "../controller/authController"
import { authorize, protect } from "../middleware/auth"
import {
  validate,
  loginValidation,
  signUpValidation,
  changePasswordValidation,
} from "../validation/index"

const router = Router();


router.route('/create-user').post(signUpValidation(), validate, protect, authorize(["admin"]), signUp);
router.route('/login').post(loginValidation(), validate, login);




router
  .route('/change-password')
  .patch(changePasswordValidation(), validate, changePassword);

export { router as authRoutes };
