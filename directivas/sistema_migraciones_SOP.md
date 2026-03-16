# SOP: Sistema de Migraciones Automáticas

## Objetivo
Implementar un sistema que permita versionar y aplicar cambios en el esquema de la base de datos de manera automática e incremental, evitando la ejecución redundante de scripts SQL.

## Estructura
- **Carpeta de Migraciones**: `database/migrations/` (donde se guardarán los archivos .sql numerados).
- **Tabla de Control**: `migrations` (rastreará qué archivos ya se aplicaron).
- **Script de Ejecución**: `scripts/migrate.py` (el motor que sincroniza la DB).

## Lógica del Script `migrate.py`
1. **Conexión**: Se conecta a la base de datos usando las credenciales del `.env` o configuradas.
2. **Inicialización**: Crea la tabla `migrations` si no existe.
3. **Escaneo**: Lista todos los archivos `.sql` en `database/migrations/` ordenados alfabéticamente.
4. **Validación**: Compara la lista de archivos con los registros en la tabla `migrations`.
5. **Ejecución**: Ejecuta solo los archivos que no están en la tabla, uno por uno, dentro de una transacción.
6. **Registro**: Inserta el nombre del archivo en la tabla tras cada ejecución exitosa.

## Reglas de Uso
- Los nombres de archivos deben seguir el formato `YYYYMMDD_vX_descripcion.sql` (ej. `20240311_v1_create_affiliates.sql`).
- Una vez aplicada una migración, **nunca debe modificarse el archivo original**. Si se necesita un cambio, se crea una nueva migración.

## Recuperación ante Errores
- Si una migración falla, el script hará `ROLLBACK` y se detendrá, informando el error exacto y el archivo que falló.
