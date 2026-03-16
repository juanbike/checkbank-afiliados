-- 🚀 SCRIPT DE INSTALACIÓN TOTAL (VERSIÓN FINAL COMPATIBLE CPANEL) 🚀
-- Este script limpia el terreno y configura TODA la base de datos de una vez.

-- 1. LIMPIEZA TOTAL
DROP TABLE IF EXISTS activity_logs, affiliate_payments, affiliate_commerce_data, affiliate_natural_profiles, affiliate_juridica_profiles, affiliate_firma_profiles, affiliate_gob_profiles, affiliate_emprendedor_profiles, auth_users, affiliates, roles, permissions, role_permissions CASCADE;

-- 2. ROLES Y PERMISOS
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE role_permissions (
    role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    permission_id INTEGER REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

INSERT INTO roles (name, slug, description) VALUES
('Administrador', 'admin', 'Control total del sistema'),
('Gestor de Afiliados', 'gestor', 'Gestión operativa de afiliados'),
('Afiliado', 'affiliate', 'Usuario del panel de afiliados');

INSERT INTO permissions (name, slug, description) VALUES
('Ver Afiliados', 'view_affiliates', 'Ver lista de afiliados'),
('Editar Afiliados', 'edit_affiliates', 'Modificar datos de afiliados'),
('Eliminar Afiliados', 'delete_affiliates', 'Eliminar registros de afiliados'),
('Ver Auditoría', 'view_audit', 'Ver el historial de operaciones');

-- Vincular todos los permisos al Admin
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p WHERE r.slug = 'admin';

-- 3. ESTRUCTURA DE AFILIADOS (Tipo UUID para compatibilidad con Seed Data)
CREATE TABLE affiliates (
    id UUID PRIMARY KEY,
    client_type VARCHAR(50) NOT NULL,
    plan VARCHAR(100) NOT NULL,
    payment_period VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auth_users (
    id UUID PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50), 
    role_id INTEGER REFERENCES roles(id),
    branch VARCHAR(100) DEFAULT 'Principal',
    affiliate_id UUID REFERENCES affiliates(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. PERFILES
CREATE TABLE affiliate_natural_profiles (
    affiliate_id UUID PRIMARY KEY REFERENCES affiliates(id) ON DELETE CASCADE,
    nombres VARCHAR(255), apellidos VARCHAR(255), documento_identidad VARCHAR(50),
    correo_electronico VARCHAR(255), estado VARCHAR(100), ciudad VARCHAR(100)
);

CREATE TABLE affiliate_juridica_profiles (
    affiliate_id UUID PRIMARY KEY REFERENCES affiliates(id) ON DELETE CASCADE,
    razon_social VARCHAR(255), rif_nit VARCHAR(50), correo_corporativo VARCHAR(255),
    estado VARCHAR(100), ciudad VARCHAR(100)
);

CREATE TABLE affiliate_firma_profiles (
    affiliate_id UUID PRIMARY KEY REFERENCES affiliates(id) ON DELETE CASCADE,
    nombre_firma VARCHAR(255), rif_firma VARCHAR(50), correo_firma VARCHAR(255),
    estado VARCHAR(100), ciudad VARCHAR(100)
);

CREATE TABLE affiliate_gob_profiles (
    affiliate_id UUID PRIMARY KEY REFERENCES affiliates(id) ON DELETE CASCADE,
    nombre_institucion VARCHAR(255), rif_nit_gob VARCHAR(50), correo_contacto VARCHAR(255)
);

CREATE TABLE affiliate_emprendedor_profiles (
    affiliate_id UUID PRIMARY KEY REFERENCES affiliates(id) ON DELETE CASCADE,
    nombres VARCHAR(255), apellidos VARCHAR(255), cedula VARCHAR(50),
    nombre_proyecto VARCHAR(255), correo_emprendedor VARCHAR(255),
    estado VARCHAR(100), ciudad VARCHAR(100)
);

CREATE TABLE affiliate_commerce_data (
    affiliate_id UUID PRIMARY KEY REFERENCES affiliates(id) ON DELETE CASCADE,
    email_administrativo VARCHAR(255), estado_comercio VARCHAR(100), actividad_economica VARCHAR(255)
);

CREATE TABLE affiliate_payments (
    id SERIAL PRIMARY KEY,
    affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
    metodo_pago VARCHAR(50), referencia VARCHAR(255), monto DECIMAL(15, 2),
    moneda VARCHAR(10) DEFAULT 'USD', status VARCHAR(50) DEFAULT 'approved',
    fecha_pago TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activity_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth_users(id),
    username VARCHAR(100), action VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50), entity_id VARCHAR(100), details JSONB,
    ip_address VARCHAR(45), created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. CREAR USUARIO ADMINISTRADOR INICIAL
INSERT INTO auth_users (id, username, password, full_name, role_id, branch)
VALUES (
    '00000000-0000-0000-0000-000000000001', -- ID manual para evitar gen_random_uuid
    'admin@consulbank.com.ve', 
    '$2b$10$u/cqNO2VfjbZAhYgg195cuxHgcnmhqqlD5FPmZOTrB6rSCGYdCDcEK', 
    'Administrador Sistema', 
    (SELECT id FROM roles WHERE slug = 'admin'),
    'Principal'
);

INSERT INTO auth_users (id, username, password, full_name, role_id, branch)
VALUES (
    '00000000-0000-0000-0000-000000000002',
    'alopez', 
    '$2b$10$u/cqNO2VfjbZAhYgg195cuxHgcnmhqqlD5FPmZOTrB6rSCGYdCDcEK', 
    'Andres Lopez', 
    (SELECT id FROM roles WHERE slug = 'admin'),
    'Principal'
);
