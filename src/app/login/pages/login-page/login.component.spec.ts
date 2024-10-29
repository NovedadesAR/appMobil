import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginPageComponent } from './login-page.component';
import { LoginService } from '../../services/login.service';
import { IonicModule } from '@ionic/angular';
import { TitleAndDescriptionComponent } from '../../components/title-and-description/title-and-description.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Creamos "mocks" para LoginService y Router
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent,TitleAndDescriptionComponent],
      imports: [ReactiveFormsModule,IonicModule], // Importamos ReactiveFormsModule para el formulario
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with empty fields', () => {
    const loginForm = component.loginForm;
    expect(loginForm).toBeTruthy();
    expect(loginForm.get('email')?.value).toBe('');
    expect(loginForm.get('password')?.value).toBe('');
    expect(loginForm.valid).toBeFalse();
  });

  it('should show error message when form is invalid on login', () => {
    component.loginAction();
    expect(component.getToastMessage).toBe('LLena correctamente los campos');
    expect(component.getisToastOpen).toBeTrue();
  });

  it('should call loginService.login when form is valid', () => {
    // Llenamos el formulario con valores válidos
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123'
    });

    // Simulamos una respuesta exitosa del servicio
    const response = { status: 200, token: 'mock-token', message: 'Success' };
    loginServiceSpy.login.and.returnValue(of(response));

    component.loginAction();

    expect(loginServiceSpy.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
      ip: '192.143.2.1',
      fecha: '2020-21-10'
    });

    expect(localStorage.getItem('token')).toBe('mock-token');
    expect(component.getToastMessage).toBe('Bienvenido');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should display error message for invalid credentials', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'wrong-password'
    });

    // Simulamos una respuesta de error del servicio (status 400)
    const responseError = { status: 400, token: '', message: 'Correo o contraseña incorrectos' };
    loginServiceSpy.login.and.returnValue(of(responseError));

    component.loginAction();

    expect(component.getToastMessage).toBe('Correo o contraseña incorrectos');
    expect(component.getisToastOpen).toBeTrue();
  });

  it('should display error message for reaching login attempt limit', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'wrong-password'
    });

    // Simulamos una respuesta de error de límite de intentos (status 409)
    const responseLimit = { status: 409, token: '', message: 'Limite de intentos alcanzados' };
    loginServiceSpy.login.and.returnValue(of(responseLimit));

    component.loginAction();

    expect(component.getToastMessage).toBe('Limite de intentos alcanzados');
    expect(component.getisToastOpen).toBeTrue();
  });

  it('should display unexpected error message for other errors', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123'
    });

    // Simulamos una respuesta de error inesperado (status diferente de 200, 400, 409)
    const responseUnexpected = { status: 500, token: '', message: 'Error inesperado' };
    loginServiceSpy.login.and.returnValue(of(responseUnexpected));

    component.loginAction();

    expect(component.getToastMessage).toBe('Error inesperado si el problema persiste comuniquese con soporte');
    expect(component.getisToastOpen).toBeTrue();
  });
});
