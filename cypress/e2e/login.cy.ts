  describe('Login Page Test', () => {
    beforeEach(() => {
      // Cambia esta URL a la de tu aplicación en desarrollo
      cy.visit('http://localhost:8100/loginModule/login'); 
    });
  
    it('should display the login form and allow a user to login', () => {
      // Verifica el título de la página
      cy.contains('Mi cuenta').should('be.visible'); // Verifica el título de la página de login
  
      // Introduce el email y la contraseña
      cy.get('.email-input').type('mabelbaam19@gmail.com');

 // Cambia a un email válido
      cy.get('.password-input').type('Mabel123@');
 // Cambia a una contraseña válida
  
      // Clic en el botón de inicio de sesión
      cy.get('ion-button[type="submit"]').click(); // Verifica el botón de inicio de sesión

      cy.url({ timeout: 90000 }).should("include", "/home"); // Verifica que la URL haya cambiado a "/inicio"

  
      // Espera y verifica el mensaje de éxito después del inicio de sesión
 // Espera hasta 10 segundos
      // Cambia si el mensaje de éxito es diferente
    });
  });
  