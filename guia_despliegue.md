# 🚀 Guía de Despliegue - Sistema de Afiliados

Esta guía describe los pasos necesarios para subir la aplicación desde tu entorno local al servidor de producción (`tecnofix.consulbank.com.ve`).

---

## 1. Preparación de la Base de Datos (PostgreSQL)

Antes de subir el código, debes preparar la base de datos en tu servidor:

1.  **Crear base de datos**: Crea una base de datos llamada `cb_database` (o el nombre que prefieras).
2.  **Ejecutar Schemas**: Ejecuta los archivos SQL en este orden:
    *   `schema.sql` (En la raíz)
    *   `scripts/migrate_rbac.sql` (Roles y Permisos)
    *   `scripts/add_affiliate_id.sql` (Vinculación Usuario-Afiliado)

---

## 2. Despliegue del Backend (Node.js)

### Pasos:
1.  **Subir carpeta `backend/`** (puedes excluir `node_modules`).
2.  **Configurar `.env`**: Crea un archivo `.env` en el servidor con los datos de producción.
3.  **Instalar y Construir**:
    ```bash
    cd backend
    npm install
    npm run build
    ```
4.  **Ejecutar**: Recomendado usar **PM2** para mantenerlo activo:
    ```bash
    pm2 start dist/server.js --name "afiliados-api"
    ```

---

## 3. Despliegue del Frontend (React + Vite)

### Pasos:
1.  **Build en tu PC local**:
    ```bash
    cd frontend
    npm run build
    ```
2.  **Subir archivos**: Copia el contenido de `frontend/dist/` a la carpeta pública de tu hosting (ej: `public_html`).
3.  **SPA Routing**: Si el hosting usa Apache, crea un archivo `.htaccess` en la carpeta del frontend:
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

---

## 4. Reverse Proxy (Opcional, si tienes acceso a config)
Si necesitas que el frontend y backend vivan en el mismo dominio, usa un proxy para `/api`.

> [!NOTE]
> Recuerda cambiar la variable `API_URL` por la URL de producción en tu código antes de hacer el build definitivo.
