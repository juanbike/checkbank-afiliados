# Directiva: Estrategia de Despliegue (Backend en cPanel + Frontend Local)

## 1. El Objetivo
Desplegar la Base de Datos y el servidor Backend (Node.js) en un hosting compartido con cPanel, manteniendo la aplicación Frontend (React) en una computadora local.

---

## 2. ¿Es la mejor estrategia? (Evaluación)

**Depende del caso de uso. Aquí los pros y contras:**

### ✅ Cuándo SÍ es buena idea:
*   **Herramienta Interna/Administrativa:** Si el software solo lo usarán empleados dentro de una oficina o sucursal particular (Intranet).
*   **Seguridad del Código Local:** Si prefieres que el código del frontend no esté expuesto en internet público.
*   **Ahorro de recursos:** Menor consumo de ancho de banda en el servidor de cPanel, ya que los archivos estáticos (HTML/JS/CSS) se cargan localmente.

### ❌ Cuándo NO es buena idea (Desventajas):
*   **Acceso Público:** Si los clientes/afiliados necesitan entrar al sistema desde sus teléfonos o casas, **no funcionará** porque la URL del frontend será `localhost` o una IP local (ej. `192.168.1.x`).
*   **Soporte de Node.js/PostgreSQL en cPanel:** La mayoría de los cPanel económicos están optimizados para **PHP y MySQL**. Para correr este proyecto necesitas que tu proveedor de hosting tenga habilitado **"Setup Node.js App"** y ofrezca **PostgreSQL**.
*   **Latencia:** Habrá un ligero retraso de red en cada clic, ya que el Frontend local debe ir por internet hasta cPanel para leer/guardar datos y regresar.

> **💡 Estrategia Recomendada:** Si el sistema es para que los usuarios (afiliados) entren desde cualquier lugar, la mejor estrategia es subir **ambos (Frontend y Backend)** a internet. El Frontend se puede subir fácilmente (y gratis) a servicios como Vercel o Netlify, mientras el backend y la base de datos están en tu hosting VPS o cPanel.

---

## 3. Paso a Paso: Subir Backend y DB a cPanel

Si decides seguir con la idea original, aquí está el proceso:

### Fase A: Preparar y Subir la Base de Datos (PostgreSQL)
1. **Respaldar BD Local:** En tu PC, haz un backup de tu base de datos PostgreSQL.
   `pg_dump -U postgres -d cb_database -F c -f backup.dump`
2. **Crear BD en cPanel:**
   * Entra a cPanel -> Sección "Bases de Datos" -> **PostgreSQL Databases** (si tu hosting no lo tiene, deberás usar MySQL y reescribir consultas o pedirle a tu proveedor que lo active).
   * Crea la base de datos (ej. `usuariocpanel_cb_database`) y un usuario. Asigna todos los privilegios.
3. **Importar Datos:**
   * Abre **phpPgAdmin** en cPanel.
   * Selecciona la nueva base de datos y usa la opción de "Importar" para subir tu archivo de backup o tus scripts SQL de creación de tablas.

### Fase B: Subir el Backend (Node.js)
1. **Preparar el Backend Local:**
   * Genera el build compilado si usas TypeScript (`npx tsc`). El código transpilado a JavaScript quedará en la carpeta `dist/`.
   * En tu archivo `.env`, cambia las credenciales locaciones por las de cPanel:
     ```env
     DB_HOST=localhost (en cpanel suele ser localhost porque la app corre en el mismo servidor)
     DB_PORT=5432
     DB_NAME=usuariocpanel_cb_database
     DB_USER=usuariocpanel_usuario
     DB_PASS=tu_password_seguro
     PORT=3001
     ```
2. **Comprimir Archivos:** Comprime el contenido de tu backend (específicamente la carpeta `dist/`, `package.json` y `.env`). **NO incluyas** la carpeta `node_modules/`.
3. **Setup Node.js App en cPanel:**
   * Ve a "Software" -> **Setup Node.js App**.
   * Haz clic en **"Create Application"**.
   * Versión de Node: Selecciona la misma que usas localmente (ej. 18.x o 20.x).
   * Application mode: `Production`.
   * Application root: Ej. `backend_cb`.
   * Application URL: Ej. `api.tudominio.com`.
   * Application startup file: Ej. `dist/server.js`.
4. **Subir Archivos y NPM Install:**
   * Ve al "Administrador de Archivos" de cPanel y entra a la carpeta raíz que creaste (`backend_cb`).
   * Sube tu archivo `.zip` comprimido y extráelo.
   * Vuelve a la pantalla de "Setup Node.js App", entra a tu aplicación y haz clic en el botón **"Run NPM Install"** para que descargue las librerías.
5. **Iniciar la aplicación:** Haz clic en "Start App".

---

## 4. Paso a Paso: Configurar el Frontend Local

Una vez que tu Backend está corriendo en `https://api.tudominio.com`:

1.  **Actualizar la API URL:**
    Abre el archivo de configuración de tu Frontend React (ej. `src/services/api.ts` o tus variables de entorno locales `.env.local` si las tienes).
    Cambia la URL local por la URL pública de cPanel:
    ```javascript
    // Antes
    const API_URL = 'http://localhost:3001/api';

    // Ahora
    const API_URL = 'https://api.tudominio.com/api';
    ```
2.  **Iniciar o generar build local:**
    *   Puedes iniciar la app para desarrollo (`npm run dev`).
    *   Si es para que los empleados la usen, puedes usar herramientas como `serve` (`npm run build` y luego `serve -s dist`) o instalar `pm2` para mantenerla corriendo de fondo y acceder a ella mediante la IP del PC local (ej. `http://192.168.1.100:5173`).

---
> **Nota de Seguridad (CORS):** Recuerda que al tener el Frontend en Local (IP o `localhost`) y el Backend en cPanel (dominio público), podrías encontrarte con un error de **CORS** en el navegador. Deberás configurar la librería `cors` en Express (Backend) para permitir solicitudes desde `http://localhost:5173` y/o la IP local del equipo que ejecuta el frontend.

---

## 5. Estrategia Alternativa: Subir TODO a cPanel (Frontend + Backend + DB)

Sí, **es totalmente posible** subir tanto el Frontend como el Backend a tu cPanel. Esta es la mejor estrategia si quieres que el sistema sea accesible desde cualquier lugar de internet.

### ¿Cómo funciona esta arquitectura en cPanel?
*   **Frontend (React):** Se compila en archivos estáticos (HTML, CSS, JS) y se sube a la carpeta `public_html` (la carpeta pública principal de tu dominio).
*   **Backend (Node.js):** Se configura como una aplicación de Node.js en una ruta específica (ej. `api.tudominio.com` o `tudominio.com/api`).
*   **Base de Datos (PostgreSQL/MySQL):** Funciona internamente en el mismo servidor.

### Pasos para subir el Frontend (React) a cPanel:

1.  **Configurar la URL de la API (Local):**
    En tu código de React (ej. `src/services/api.ts`), asegúrate de que apunte a la URL pública donde estará tu backend.
    ```javascript
    // api.ts
    const API_URL = 'https://tudominio.com/api'; // O el subdominio que elijas para tu Node app
    ```
2.  **Generar el Build para Producción (Local):**
    En la terminal de la carpeta `frontend`, ejecuta:
    ```bash
    npm run build
    ```
    Esto creará una carpeta llamada `dist/` (o `build/` dependiendo de tu configuración de Vite/Create React App) con los archivos optimizados.
3.  **Subir a cPanel:**
    *   Entra a cPanel -> **Administrador de Archivos** -> `public_html`.
    *   Comprime el contenido de tu carpeta `dist/` en un `.zip`.
    *   Sube el `.zip` a `public_html` y extráelo. El archivo `index.html` debe quedar directamente dentro de `public_html`.
4.  **Configurar el enrutamiento (Muy Importante para React):**
    React usa enrutamiento del lado del cliente (React Router). Si un usuario entra directamente a `tudominio.com/login`, cPanel buscará un archivo `login.html` y dará error 404.
    Para arreglar esto, crea o edita un archivo llamado `.htaccess` en tu `public_html` con este código:
    ```apache
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
    </IfModule>
    ```

Con estos pasos, al entrar a `tudominio.com`, cPanel cargará tu aplicación React, la cual se comunicará de forma segura con tu API Node.js alojada en el mismo servidor.
