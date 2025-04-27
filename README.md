<h1 align="center">🪵 Barraca Santa Cruz🦫 </h1>


<table align="center" style="width: 100%; text-align: center; border-collapse: collapse; border: 1px solid blue; border-radius: 15px; background-color: #f4f4f9; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); padding: 20px;">
  <tr>
    <td style="border: none; padding: 0; padding-right: 20px;">
      <img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg" alt="Angular Logo" width="120" style="transition: transform 0.3s ease-in-out;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
    </td>
    <td style="border: none; padding: 0;">
      <h1 style="font-size: 100px; margin: 0; color: #e53e3e; font-family: 'Arial', sans-serif; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);">Angular </h1>
    </td>
  </tr>
</table>



---

## 🛠 Instalaciones realizadas

---

# 1️⃣ 📚 Instalación de Angular CLI 19.2.7
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

