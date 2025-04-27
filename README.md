<h1 align="center">T i e n d a - O n l i n e</h1>
<h1 align="center"> 📚 Documentación de Instalaciones - Proyecto Angular 19.2.7 </h1>

<table>
  <tr>
    <td><h1>Framework Angular</h1></td>
    <td> <img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg" alt="Angular Logo" width="100"/></td>
  </tr>
</table>

## 🛠 Instalaciones realizadas
# 1. CLI angular

```bash
npm install -g @angular/cli@19.2.7
```
```bash
# Crear un nuevo proyecto Angular llamado 'frontend'
ng new frontend

# Moverse al directorio del proyecto
cd frontend

# Instalar Angular Material, un conjunto de componentes UI de Angular
ng add @angular/material

# Instalar Bootstrap para estilos CSS y diseño responsivo
npm install bootstrap

# Instalar iconos adicionales
npm install bootstrap-icons
npm install @fortawesome/fontawesome-free

# Instalar Popper.js, que es una dependencia de Bootstrap para algunos componentes
npm install @popperjs/core

# Añadir soporte para HTTP, útil para hacer solicitudes al backend
ng add @angular/common/http
npm install @angular/common@latest
                                                                          
```
## Generación de servicios y componentes
En Angular, los servicios son útiles para manejar la lógica de negocio y los componentes son las piezas que construyen la interfaz. Aquí tienes comandos para generar diferentes servicios y componentes para tu proyecto:
```bash
# Generar un servicio para usuarios como ejemplo
ng generate service services/Usuario

# Generar componentes para la gestión de solicitudes
ng generate component components/MadreUsuario/registrar-Usuario
ng generate component components/MadreUsuario/listar-Usuario
ng generate component components/MadreUsuario/editar-Usuario

# para crear en las mismas carpetas usa estos comandos
# Generar un servicio para manejar solicitudes
ng generate service components/MadreUsuario/services/Usuario

# Generar una clase para el modelo de solicitudes
ng generate class components/MadreUsuario/models/Usuario
                                                                           
```

## Ejecutar el proyecto
Para iniciar el servidor de desarrollo y probar tu proyecto Angular, ejecuta:

```bash
# Ejecutar el proyecto en el servidor local
ng serve
```
