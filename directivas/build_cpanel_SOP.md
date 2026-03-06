# Directiva: Construcción y Empaquetado para cPanel (SOP)

## Objetivo
Automatizar el proceso de construcción (build) y empaquetado del Frontend y Backend en formato `.zip` listos para ser subidos directamente a cPanel, asegurando que no falten archivos clave (como el `.htaccess` para React o el `package.json` para Node.js).

## Entradas
- Código fuente en `c:\afiliados\frontend`
- Código fuente en `c:\afiliados\backend`

## Salidas
- `c:\afiliados\.tmp\frontend_cpanel.zip`: Archivos estáticos del frontend listos para `public_html`.
- `c:\afiliados\.tmp\backend_cpanel.zip`: Archivos compilados del backend listos para la app Node.js en cPanel.

## Lógica y Pasos a Ejecutar
### 1. Construcción del Frontend
1. Entrar a `c:\afiliados\frontend`.
2. Ejecutar `npm run build` para generar la carpeta `dist/`.
3. Inyectar el archivo `.htaccess` dentro de `dist/` para resolver las rutas de React Router en cPanel.
4. Comprimir el contenido de `dist/` en `frontend_cpanel.zip` y guardarlo en la carpeta `.tmp/`.

### 2. Construcción del Backend
1. Entrar a `c:\afiliados\backend`.
2. Ejecutar `npm run build` (asegurarse de que llama a `tsc`) para generar la carpeta `dist/`.
3. Crear un paquete incluyendo:
   - La carpeta `dist/` entera.
   - El archivo `package.json`.
   - El archivo `.env` (o `.env.example`).
4. Comprimir estos archivos en `backend_cpanel.zip` y guardarlo en la carpeta `.tmp/`.

## Restricciones / Casos Borde Conocidos
- **Nota 1:** NUNCA incluir la carpeta `node_modules` en los `.zip`. En cPanel, las dependencias se instalarán ejecutando `npm install` desde "Setup Node.js App".
- **Nota 2:** El `.htaccess` de Fronted es crítico para evitar el error `404` al recargar la página en rutas que no sean la principal (ej `/login`).
- **Nota 3:** Nos aseguramos de configurar `shell=True` en Python `subprocess` al usar `npm` en Windows.
