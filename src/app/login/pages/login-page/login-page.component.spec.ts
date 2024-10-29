import { ComponentFixture, TestBed } from '@angular/core/testing'; // Herramientas de prueba
import { LoginPageComponent } from './login-page.component'; // El componente que queremos probar
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Para simular peticiones HTTP
import { LoginService } from '../../services/login.service'; // El servicio de Login, se usará un mock
import { ReactiveFormsModule } from '@angular/forms'; // Para manejar formularios reactivos
import { Router } from '@angular/router'; // Para simular navegación
import { of } from 'rxjs'; // Para simular respuestas de observables

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    // Crear un mock del LoginService
    const loginServiceMock = jasmine.createSpyObj('LoginService', ['login']);
    loginServiceMock.login.and.returnValue(of({ status: 200, token: 'mock-token' })); // Simula el éxito del login

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule], // Importa los módulos necesarios
      declarations: [LoginPageComponent], // Declara el componente bajo prueba
      providers: [
        { provide: LoginService, useValue: loginServiceMock }, // Usa el mock del LoginService
        { provide: Router, useValue: routerSpy } // Usa un mock del Router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent); // Crea una instancia de fixture para acceder al DOM
    component = fixture.componentInstance; // Obtén una instancia del componente
    loginServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>; // Inyecta el servicio mockeado
    fixture.detectChanges(); // Aplica cambios en el DOM
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se creó correctamente
  });

  it('el formulario debe ser inválido cuando está vacío', () => {
    expect(component.loginForm.valid).toBeFalsy(); // Verifica que el formulario esté inválido si está vacío
  });

  it('debería validar el campo de email como requerido y con formato correcto', () => {
    const email = component.loginForm.controls['email'];
    
    // Campo vacío debe ser inválido
    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();

    // Correo no válido
    email.setValue('test');
    expect(email.hasError('email')).toBeTruthy();

    // Correo válido
    email.setValue('test@example.com');
    expect(email.valid).toBeTruthy();
  });

  it('debería validar el campo de contraseña como requerido', () => {
    const password = component.loginForm.controls['password'];

    // Campo vacío debe ser inválido
    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();

    // Contraseña válida
    password.setValue('123456');
    expect(password.valid).toBeTruthy();
  });

  it('debería iniciar sesión correctamente si el formulario es válido y LoginService devuelve éxito', () => {
    // Configuración del formulario con datos válidos
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('123456');
    fixture.detectChanges();

    component.loginAction(); // Llama al método loginAction

    expect(loginServiceSpy.login).toHaveBeenCalled(); // Verifica que el método login fue llamado
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']); // Verifica que se redirige al home
  });
});


