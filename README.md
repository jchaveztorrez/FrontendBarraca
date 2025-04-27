<h1 align="center">🛒 Tienda Online</h1>
<h2 align="center">📚 Documentación de Instalaciones - Proyecto Angular 19.2.7</h2>

<table align="center">
  <tr>
    <td><h1>Framework Angular</h1></td>
    <td><img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg" alt="Angular Logo" width="100"/></td>
  </tr>
</table>

---

## 🛠 Instalaciones realizadas

---

# 1. CLI angular
```bash
npm install -g @angular/cli@19.2.7
```

# 2. Creación de Proyecto Angular
```bash
ng new nombre-del-proyecto
```

# 3. Bootstrap
```bash
npm install bootstrap
```
# 4. Iconos de Bootstrap
```bash
npm install bootstrap-icons
```
# 5. Configuración de Bootstrap y Bootstrap Icons
En el archivo angular.json, sección stylesy scripts:
```bash
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/bootstrap-icons/font/bootstrap-icons.css",
  "src/styles.css"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]

```
# 6. Corrección del HMR (Reemplazo de módulo en caliente)
Acción realizada:
Desactivamos HMR para evitar errores de recarga caliente de módulos.

Modificación en angular.json:
```bash
"development": {
  "buildTarget": "FrontendBarraca:build:development",
  "hmr": false
}

```
# 7. Crear el proyecto Angular en la versión 19.2.7
en esta parte sigue los pasos de instalcion cuidadosamente hasta finalizar la instlacion 
```bash
ng new nombre-de-tu-proyecto
cd nombre-de-tu-proyecto

```
# 🚀 Comandos útiles

```bash
ng serve

```
# Crear componentes:
```bash
ng generate component nombre-del-componente

```
# Crear servicios:
```bash
ng generate service nombre-del-servicio
# crear models
```bash

```
```
#Construcción de producción:
```bash
ng build --configuration production

```
#
```bash

```
#
```bash

```
#
```bash

```
#
```bash

```
#
```bash

```

