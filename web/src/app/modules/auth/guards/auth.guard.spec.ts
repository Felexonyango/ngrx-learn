import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable,of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController, } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthGuard } from '../guards/auth.guard'


describe('Auth Guard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;
const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: { isLoggedIn: () => true, redirectUrl: '', getRole: () => '' } },
            { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should return true if the user is logged in and the route matches the user role', () => {
    authService.getRole = () => 'admin';
  
    const route = {
      data: { role: ['admin'] },
    } as unknown as ActivatedRouteSnapshot;
    const state = { url: 'test-url' } as RouterStateSnapshot;
  
    const result = guard.canActivate(route, state);
  
    expect(result).toBeInstanceOf(Observable);
    result.subscribe((value) => expect(value).toBeTrue());
  });
  
  it('should return false if the user is not logged in', () => {
    authService.isLoggedIn = () => false;
  
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
  
    const result = guard.canActivate(route, state);
``  
    expect(result).toBeInstanceOf(Observable);
    result.subscribe((value) => expect(value).toBeFalse());
  });
  
  it('should return false if the user role does not match the route data', () => {
    authService.getRole = () => 'user';
  
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.overrideProvider(Router, { useValue: routerSpy });
    
    const route = {
      data: { role: ['admin'] },
    } as unknown as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
  
    
    const result = guard.canActivate(route, state);
    expect(result).toBeInstanceOf(Observable);
    result.subscribe((value) => expect(value).toBeFalse());
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    routerSpy.navigate.calls.reset();
  });
  
  
});
