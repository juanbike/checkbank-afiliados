# SOP: Implementación CRUD de Afiliados

## Objetivo
Implementar una interfaz de gestión completa (CRUD: Create, Read, Update, Delete) para los afiliados en la plataforma, permitiendo a los administradores gestionar la base de datos de afiliados de manera eficiente.

## Alcance
- **Backend**: Endpoint para listar, actualizar y eliminar afiliados.
- **Frontend**: Vista de gestión con tabla de datos, búsqueda, edición y confirmación de eliminación.

## Pasos

### 1. Backend: Endpoints de Gestión [COMPLETADO]
- Implementado `getAffiliateById`, `updateAffiliate` y `deleteAffiliate` en `affiliateController.ts`.
- Registradas rutas en `affiliateRoutes.ts`.

### 2. Frontend: Componente de Gestión [COMPLETADO]
- Creado componente `AffiliateManagement.tsx`.
- Implementada tabla con búsqueda, edición y eliminación.
- Integrado en `App.tsx` para fácil acceso.

### 3. Seguridad
- Asegurar que los endpoints de gestión solo sean accesibles por usuarios con rol 'admin'.

## Restricciones y Casos Borde
- **Integridad Referencial**: Al eliminar un afiliado, considerar qué sucede con sus usuarios asociados (`auth_users`) y registros de perfiles específicos.
- **Visualización**: Manejar los diferentes tipos de perfiles (natural, jurídica, etc.) para mostrar la información correcta en la tabla.
- **Modo Oscuro (Tailwind v4)**: En Tailwind CSS v4, el modo oscuro basado en clases manuales (clase `.dark`) NO funciona por defecto. Se debe configurar un `@custom-variant` en el CSS global (`index.css`) para que detecte la clase: `@custom-variant dark (&:is(.dark, .dark *));`.

## Verificación
- Probar que un admin pueda editar el nombre de un afiliado.
- Probar que un admin pueda cambiar el estado de 'pending' a 'active'.
- Probar que la eliminación limpie las tablas relacionadas o maneje el error de FK correctamente.
