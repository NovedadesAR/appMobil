# Aplicación Móvil de Novedades A&R

La aplicación móvil de **Novedades A&R** está diseñada para facilitar la experiencia de compra de ropa para dama y caballero. Esta aplicación permitirá a los usuarios navegar a través de una lista de productos, gestionar su cuenta y realizar compras de manera sencilla y segura.

## Objetivos del Proyecto

- Desarrollar una aplicación móvil que permita a los usuarios crear y gestionar su cuenta.
- Implementar un sistema de inicio de sesión y recuperación de contraseña.
- Facilitar la visualización de productos y la gestión de un carrito de compras.
- Integrar una pasarela de pagos segura para realizar transacciones.

## Metodología de Trabajo

La metodología utilizada en este proyecto es **XP (eXtreme Programming)**, que se centra en la calidad del software y la satisfacción del cliente a través de iteraciones rápidas, colaboración constante y pruebas frecuentes.

## Herramienta de Control de Versiones

Se utilizará **GitHub** como herramienta de control de versiones para gestionar el código y facilitar la colaboración entre los miembros del equipo.

## Estrategia de Versionamiento

La estrategia de versionamiento adoptada es **Git Flow**, que proporciona un enfoque estructurado para la gestión de ramas en el desarrollo, permitiendo una fácil integración y entrega continua.

## Estrategia de Despliegue

La estrategia de despliegue seleccionada es **Blue-Green Deployment**. Esta estrategia permite mantener dos entornos idénticos (blue y green), donde uno de ellos está en producción y el otro se utiliza para las nuevas versiones. Esto minimiza el tiempo de inactividad y permite realizar pruebas antes de redirigir a los usuarios a la nueva versión.

## Requisitos previos para levantar el proyecto

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- [Node.js](https://nodejs.org/) (versión recomendada: 14.x o superior)
- [Ionic CLI](https://ionicframework.com/docs/cli) (instalar con: `npm install -g @ionic/cli`)
- [Git](https://git-scm.com/) para clonar el repositorio

## Clonar el proyecto

Para clonar este proyecto a tu máquina local, abre tu terminal y ejecuta el siguiente comando:

```bash
git clone https://github.com/ElNao28/appMobil-novedadesAR.git
```

## Instalar dependencias

Para instalar las dependencias del proyecto, abre tu terminal y ejecuta el siguiente comando:

```bash
npm install
```

## Ejecutar proyecto

Para ejecutar el proyecto primero asegurate de haber hecho los anteriores pasos, una vez tengas hechos los pasos anteriores para ejecutar el proyecto
lo que tienes que hacer es abrir tu terminal y ejecutar el siguiente comando:

```bash
ionic serve
```
