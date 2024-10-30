import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService } from '../../services/login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { IonicModule,NavController  } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };



  beforeEach(async () => {
    const loginServiceMock = jasmine.createSpyObj('LoginService', ['login']);
    loginServiceMock.login.and.returnValue(of({ status: 200, token: 'mock-token' }));

       // Mock del NavController
       const navControllerMock = jasmine.createSpyObj('NavController', ['navigateForward', 'navigateBack']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        ReactiveFormsModule,
        IonicModule.forRoot()  
    ],
      declarations: [LoginPageComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
        { provide: Router, useValue: routerSpy },
        { provide: NavController, useValue: navControllerMock } // Proveedor del mock
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Agrega esto para ignorar errores de elementos desconocidos
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    loginServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('el formulario debe ser inválido cuando está vacío', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('debería validar el campo de email como requerido y con formato correcto', () => {
    const email = component.loginForm.controls['email'];
    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
    email.setValue('test');
    expect(email.hasError('email')).toBeTruthy();
    email.setValue('test@example.com');
    expect(email.valid).toBeTruthy();
  });

  it('debería validar el campo de contraseña como requerido', () => {
    const password = component.loginForm.controls['password'];
    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();
    password.setValue('123456');
    expect(password.valid).toBeTruthy();
  });

  it('debería iniciar sesión correctamente si el formulario es válido y LoginService devuelve éxito', fakeAsync(() => {
    // Configura el formulario con valores válidos
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('123456');
    
    // Llama a la función de inicio de sesión
    component.loginAction();
    
    // Avanza el tiempo simulado en 2000 ms para que se ejecute el setTimeout
    tick(2000);
  
    // Verifica que el servicio de login fue llamado
    expect(loginServiceSpy.login).toHaveBeenCalled();
  
    // Verifica que la navegación se realizó a '/home'
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  }));
  
});
