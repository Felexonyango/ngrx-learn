import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../models/user.schema';
import { ROLES_KEY } from './role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService:JwtService
    ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    type Payload = {
      id:string;
      email:string;
      role:Roles
    }
  
    const request = context.switchToHttp().getRequest();
    
    let verifiedToken:Payload = null;
    let token = '';
    request.rawHeaders.forEach((item) => {
      let itemDetails = item.split(' ')[0];
      if(itemDetails === 'Bearer'){
        token = item.split(' ')[1];
      }
    })
    
    verifiedToken = this.jwtService.decode(token) as Payload;
    return requiredRoles.some((role) => verifiedToken.role?.includes(role));
  }
}