import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../../icons/icon-subset';
import { AuthService } from '@app/auth.service';

import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

// Mocks
class MockAuthService {
  login(form: any) {
    return of({ token: 'fake-jwt-token' }); // simule une réponse réussie
  }
}

class MockRouter {
  navigate(path: any[]) {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormModule, CardModule, GridModule, ButtonModule, IconModule, LoginComponent],
      providers: [
        IconSetService,
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login and navigate on success', () => {
    spyOn(authService, 'login').and.callThrough();
    spyOn(router, 'navigate');
    spyOn(localStorage, 'setItem');

    component.form = { username: 'test', password: 'test' };
    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith(component.form);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fake-jwt-token');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should set errorMessage on login failure', () => {
    spyOn(authService, 'login').and.returnValue(throwError(() => new Error('Login failed')));

    component.form = { username: 'test', password: 'wrong' };
    component.onSubmit();

    expect(component.errorMessage).toBe('Login failed');
  });
});
