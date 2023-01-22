import { Strategy as localStrategy } from "passport-local";
import { Strategy as JWTstrategy, ExtractJwt } from "passport-jwt";
import { User } from "../model/user";
import { Role } from "../types/role";
import { JWT_SECRET_KEY } from "../config";
import { Department as DepartmentTypes } from "../types/department";
import { Department } from "../model/department";

//This verifies that the token sent by the user is valid

module.exports = function (passport: any) {
  passport.use(
    new JWTstrategy(
      {
        secretOrKey: JWT_SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          const { user_id } = token;
          const user = await User.findById(user_id);
          if (!user) return done(null, false, "User not found");
          //Pass the user details to the next middleware
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "signUp",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          // check if the department field exists in the request body
          if (!req.body.department) {
            return done(null, false, { message: "Department field is required" });
          }

          // find the department by its name
          
          const department = await Department.findById(req.body.department);
          if (!department) {
            return done(null, false, { message: "Invalid department" });
          }

          // check if the email is already taken
          const user = await User.findOne({ email: email.toLowerCase() });
          if (user) {
            return done(null, false, { message: "Email is already taken" });
          }

          // create the user
          const newUser = await User.create({
            email,
            password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            role: Role.User,
            startDate: req.body.startDate,
            nextOfKin: req.body.nextOfKin,
            idNumber: req.body.idNumber,
            kraPin: req.body.kraPin,
            bankAccountNumber: req.body.bankAccountNumber,
            bankName: req.body.bankName,
            phoneNumber: req.body.phoneNumber,
            employeeIdNumber: req.body.employeeIdNumber,
            taxRegNO: req.body.taxRegNO,
            swiftCode: req.body.swiftCode,
            branchName: req.body.branchName,
            bankCode: req.body.bankCode,
            department: department._id
          });

          return done(null, newUser);

        } catch (error) {
          done(error);
        }
      }
    )
  );

  
  passport.use(
    "login",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },

      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, {
              message: "Email or Password is incorrect",
            });
          }

          const isPasswordMatch = await user.comparePassword(password);

          if (!isPasswordMatch)
            return done(null, false, {
              message: "Email or password is incorrect",
            });

          return done(null, user, { message: "Logged in Successfully" });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
