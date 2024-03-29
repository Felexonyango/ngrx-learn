import { Response, Request, NextFunction } from 'express';
import passport from 'passport';
import { User } from '../types/user'
import { Role } from '../types';

// export const protect = (req: Request, res: Response, next: NextFunction) => {
//   return passport.authenticate('jwt', { session: false }, function (err,user,info) {
//     if (err) {
//       return next(info);
//     }
//     if (!user)
//       return res.status(401).json({
//         error: {
//           message: 'Not Authorized',
//           name: 'AUTHENTICATION_FAILURE',
//         },
//         success: false,
//       });
//     req.user = user;
//     return next();
//   })(req, res, next);
// };



// import { Request, Response, NextFunction } from 'express';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        error: {
          message: 'Not Authorized',
          name: 'AUTHENTICATION_FAILURE',
        },
        success: false,
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User; // assuming user object has been added to request object by authentication middleware
    if (!user.role || !user.role.some(role => roles.includes(role))) {
      return res.status(403).json({
        error: {
          name: 'Unauthorized',
          message: 'You are not authorized to perform this action',
        },
        success: false,
      });
    }
    next();
  };
};


