-- 📦 SCRIPT DE ESTRUCTURA COMPLETA (CPANEL COMPATIBLE) 📦
-- Ejecuta este script primero para limpiar y crear la base de datos correctamente.

-- 0. Limpieza (Opcional, ten cuidado si ya tienes datos reales)
-- DROP TABLE IF EXISTS activity_logs, affiliate_payments, affiliate_commerce_data, affiliate_natural_profiles, affiliate_juridica_profiles, affiliate_firma_profiles, affiliate_gob_profiles, affiliate_emprendedor_profiles, auth_users, affiliates, roles, permissions, role_permissions CASCADE;

-- 1. Tablas de Seguridad (RBAC)
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS role_permissions (
    role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    permission_id INTEGER REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- 2. Tabla Maestra de Afiliados (Usamos UUID para compatibilidad con el Seed Data)
CREATE TABLE IF NOT EXISTS affiliates (
    id UUID PRIMARY KEY, -- Sin default para evitar errores de gen_random_uuid()
    client_type VARCHAR(50) NOT NULL,
    plan VARCHAR(100) NOT NULL,
    payment_period VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla de Usuarios
CREATE TABLE IF NOT EXISTS auth_users (
    id UUID PRIMARY KEY, -- Sin default
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50), -- Opcional, para compatibilidad vieja
    role_id INTEGER REFERENCES roles(id),
    branch VARCHAR(100) DEFAULT 'Principal',
    affiliate_id UUID REFERENCES affiliates(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Perfiles Específicos
CREATE TABLE IF NOT EXISTS affiliate_natural_profiles (
    affiliate_id UUID PRIMARY KEY REFERENCES affiliates(id) ON DELETE CASCADE,
    nombres VARCHAR(255),
    apellidos VARCHAR(255),
    documento_identidad VARCHAR(50),
    correo_electronico VARCHAR(255),
    estado VARCHAR(100),
    ciudad VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS affiliate_juridica_profiles (
    affiliate_id UUID PRIMARY KEY REFERENCES affiliates(id) ON DELETE CASCADE,
    razon_social VARCHAR(255),
    rif_nit VARCHAR(50),
    correo_corporativo VARCHAR(255),
    estado VARCHAR(100),
    ciudad VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS affiliate_firma_profiles (
    affiliate_id UUID PRIMARY KEY REFERENCES affiliates(id) ON DELETE CASCADE,
    nombre_firma VARCHAR(255),
    rif_firma VARCHAR(50),
    correo_firma VARCHAR(255),
    estado VARCHAR(100),
    ciudad VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS affiliate_gob_profiles (
    affiliate_id UUID PRIMARY KEY REFERENCES affiliates(id) ON DELETE CASCADE,
    nombre_institucion VARCHAR(255),
    rif_nit_gob VARCHAR(50),
    correo_contacto VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS affiliate_emprendedor_profiles (
    affiliate_id UUID PRIMARY KEY REFERENCES affiliates(id) ON DELETE CASCADE,
    nombres VARCHAR(255),
    apellidos VARCHAR(255),
    cedula VARCHAR(50),
    nombre_proyecto VARCHAR(255),
    correo_emprendedor VARCHAR(255),
    estado VARCHAR(100),
    ciudad VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS affiliate_commerce_data (
    affiliate_id UUID PRIMARY KEY REFERENCES affiliates(id) ON DELETE CASCADE,
    email_administrativo VARCHAR(255),
    estado_comercio VARCHAR(100),
    actividad_economica VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS affiliate_payments (
    id SERIAL PRIMARY KEY,
    affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
    metodo_pago VARCHAR(50),
    referencia VARCHAR(255),
    monto DECIMAL(15, 2),
    moneda VARCHAR(10) DEFAULT 'USD',
    status VARCHAR(50) DEFAULT 'approved',
    fecha_pago TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabla de Auditoría
CREATE TABLE IF NOT EXISTS activity_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth_users(id),
    username VARCHAR(100),
    action VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50),
    entity_id VARCHAR(100),
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
