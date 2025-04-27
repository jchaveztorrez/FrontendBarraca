<h1 align="center">🛒 Tienda Online</h1>
<h2 align="center">📚 Documentación de Instalaciones - Proyecto Angular 19.2.7</h2>



<p align="center" style="display: flex; align-items: center; justify-content: center; gap: 15px;">
  <img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg" alt="Angular Logo" width="80">
  <span style="font-size: 80px; font-weight: bold;">Angular</span>
</p>




---

## 🛠 Instalaciones realizadas

---

# 1️⃣ Instalación de Angular CLI
```bash
npm install -g @angular/cli@19.2.7
```

# 2️⃣ Crear un Nuevo Proyecto Angular
```bash
ng new nombre-de-tu-proyecto
cd nombre-de-tu-proyecto
```

# 3️⃣ Instalar Bootstrap
```bash
npm install bootstrap
```

# 4️⃣ Instalar Bootstrap Icons
```bash
npm install bootstrap-icons
```

# 5️⃣ Configurar Bootstrap y Bootstrap Icons
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

# 6️⃣ Corrección de HMR (Hot Module Replacement)
Acción realizada:
Desactivamos HMR para evitar errores de recarga caliente de módulos.

Modificación en angular.json:
```bash
"development": {
  "buildTarget": "FrontendBarraca:build:development",
  "hmr": false
}

```
# 7️⃣ SSR (Server-Side Rendering) ⚡ (Opcional)
```bash
npm run build:ssr
npm run serve:ssr
```

---
# 🚀 Comandos útiles
---

#▶️ Levantar servidor de desarrollo
```bash
ng serve
```

# 🧩 Crear Componentes
```bash
ng generate component nombre-del-componente
```

# 🔧 Crear Servicios
```bash
ng generate service nombre-del-servicio
```

# 📝 Crear Modelos
```bash
ng generate interface models/nombre-del-modelo
```

# 📦 Construcción de Producción
```bash
ng build --configuration production
```

