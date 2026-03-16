-- 🚨 SCRIPT DE ACTUALIZACIÓN PARA PRODUCCIÓN (VERSION 2026-03-12) 🚨
-- Ejecuta este script en tu base de datos de hosting para activar todas las funciones de Login y Auditoría.

-- 1. Tabla de Auditoría (Activity Logs)
-- Cambiamos user_id a VARCHAR(100) para máxima compatibilidad con el ID de auth_users en el servidor
CREATE TABLE IF NOT EXISTS activity_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(100),         -- Guardamos el ID como string para evitar conflictos de tipo UUID vs Integer/String
    username VARCHAR(100),
    action VARCHAR(50) NOT NULL, -- LOGIN, UPDATE_AFFILIATE, etc.
    entity_type VARCHAR(50),      -- affiliates, payments, etc.
    entity_id VARCHAR(100),       -- ID de la entidad afectada
    details JSONB,                -- Data técnica o resumen de cambios
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_action ON activity_logs(action);
CREATE INDEX IF NOT EXISTS idx_activity_logs_date ON activity_logs(created_at);

-- 2. Roles Adicionales y Permisos de Gestión
INSERT INTO roles (name, slug, description) VALUES
('Administrador', 'admin', 'Control total del sistema y auditoría'),
('Gestor de Afiliados', 'gestor', 'Gestión operativa de afiliados')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO permissions (name, slug, description) VALUES
('Ver Afiliados', 'view_affiliates', 'Ver lista de afiliados'),
('Editar Afiliados', 'edit_affiliates', 'Modificar datos de afiliados'),
('Eliminar Afiliados', 'delete_affiliates', 'Eliminar registros de afiliados'),
('Ver Auditoría', 'view_audit', 'Ver el historial de operaciones')
ON CONFLICT (slug) DO NOTHING;

-- 3. Vincular Permisos a Roles
-- Admin tiene todo
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.slug = 'admin' AND p.slug IN ('view_affiliates', 'edit_affiliates', 'delete_affiliates', 'view_audit')
ON CONFLICT DO NOTHING;

-- Gestor solo gestión
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.slug = 'gestor' AND p.slug IN ('view_affiliates', 'edit_affiliates', 'delete_affiliates')
ON CONFLICT DO NOTHING;

-- 4. Crear/Actualizar Usuario Administrador
-- Primero eliminamos si existe para asegurar una inserción limpia (máxima compatibilidad)
DELETE FROM auth_users WHERE username = 'admin@consulbank.com.ve';

INSERT INTO auth_users (username, password, full_name, role_id, branch)
VALUES (
    'admin@consulbank.com.ve', 
    '$2b$10$u/cqNO2VfjbZAhYgg195cuxHgcnmhqqlD5FPmZOTrB6rSCGYdCDcEK', 
    'Administrador Sistema', 
    (SELECT id FROM roles WHERE slug = 'admin'),
    'Principal'
);
