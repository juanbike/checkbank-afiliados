-- Migración: Implementación de RBAC (Roles y Permisos)

-- 1. Crear tabla de Roles
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Crear tabla de Permisos
CREATE TABLE IF NOT EXISTS permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla intermedia: Rol-Permiso
CREATE TABLE IF NOT EXISTS role_permissions (
    role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    permission_id INTEGER REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- 4. Modificar auth_users para usar role_id en lugar de role string
-- Primero creamos el rol default 'affiliate'
INSERT INTO roles (name, slug, description) 
VALUES ('Afiliado', 'affiliate', 'Usuario con acceso al panel de afiliado')
ON CONFLICT (slug) DO NOTHING;

-- Agregamos la columna role_id
ALTER TABLE auth_users ADD COLUMN IF NOT EXISTS role_id INTEGER REFERENCES roles(id);

-- Migramos los datos: Asignar el ID del rol 'affiliate' a todos los que tengan role='affiliate'
UPDATE auth_users 
SET role_id = (SELECT id FROM roles WHERE slug = 'affiliate')
WHERE role = 'affiliate' AND role_id IS NULL;

-- Insertar algunos permisos básicos para probar
INSERT INTO permissions (name, slug, description) VALUES
('Ver Dashboard', 'view:dashboard', 'Permiso para ver el resumen del sistema'),
('Seleccionar Plan', 'select:plan', 'Permiso para elegir o cambiar el plan de suscripción'),
('Actualizar Perfil', 'update:profile', 'Permiso para editar datos del afiliado')
ON CONFLICT (slug) DO NOTHING;

-- Asignar permisos al rol de afiliado
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM roles r, permissions p
WHERE r.slug = 'affiliate' AND p.slug IN ('view:dashboard', 'select:plan', 'update:profile')
ON CONFLICT DO NOTHING;
