-- TABLA DE USUARIOS (Login)
CREATE TABLE auth_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'affiliate',
    branch VARCHAR(100) DEFAULT 'Principal',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- TABLA MAESTRA DE AFILIADOS
CREATE TABLE affiliates (
    id SERIAL PRIMARY KEY,
    client_type VARCHAR(50) NOT NULL, -- natural, juridica, firma_personal, etc.
    plan VARCHAR(100) NOT NULL,
    payment_period VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, active, suspended
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- TABLA DE PAGOS DE AFILIACIÓN
CREATE TABLE affiliate_payments (
    id SERIAL PRIMARY KEY,
    affiliate_id INTEGER REFERENCES affiliates(id) ON DELETE CASCADE,
    metodo_pago VARCHAR(50),
    referencia VARCHAR(255),
    fecha_pago TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    monto DECIMAL(15, 2),
    moneda VARCHAR(10) DEFAULT 'USD',
    status VARCHAR(50) DEFAULT 'pending',
    detalles_pago JSONB
);

-- PERFIL: PERSONA NATURAL
CREATE TABLE affiliate_natural_profiles (
    affiliate_id INTEGER PRIMARY KEY REFERENCES affiliates(id) ON DELETE CASCADE,
    nombres VARCHAR(255),
    apellidos VARCHAR(255),
    documento_identidad VARCHAR(50),
    fecha_nacimiento DATE,
    genero VARCHAR(50),
    profesion_ocupacion VARCHAR(255),
    direccion_principal TEXT,
    estado VARCHAR(100),
    ciudad VARCHAR(100),
    municipio VARCHAR(100),
    parroquia VARCHAR(100),
    codigo_postal VARCHAR(20),
    correo_electronico VARCHAR(255),
    telefono_movil VARCHAR(50)
);

-- PERFIL: PERSONA JURÍDICA
CREATE TABLE affiliate_juridica_profiles (
    affiliate_id INTEGER PRIMARY KEY REFERENCES affiliates(id) ON DELETE CASCADE,
    razon_social VARCHAR(255),
    rif_nit VARCHAR(50),
    domicilio_fiscal TEXT,
    estado VARCHAR(100),
    ciudad VARCHAR(100),
    municipio VARCHAR(100),
    parroquia VARCHAR(100),
    codigo_postal VARCHAR(20),
    rep_nombres VARCHAR(255),
    rep_apellidos VARCHAR(255),
    rep_documento VARCHAR(50),
    correo_corporativo VARCHAR(255),
    telefono_fijo VARCHAR(50)
);

-- PERFIL: FIRMA PERSONAL
CREATE TABLE affiliate_firma_profiles (
    affiliate_id INTEGER PRIMARY KEY REFERENCES affiliates(id) ON DELETE CASCADE,
    nombre_firma VARCHAR(255),
    rif_firma VARCHAR(50),
    nombre_titular VARCHAR(255),
    cedula_titular VARCHAR(50),
    direccion_fiscal TEXT,
    estado VARCHAR(100),
    ciudad VARCHAR(100),
    municipio VARCHAR(100),
    parroquia VARCHAR(100),
    codigo_postal VARCHAR(20),
    correo_firma VARCHAR(255),
    telefono_firma VARCHAR(50),
    actividad_comercial TEXT
);

-- PERFIL: ENTE GUBERNAMENTAL
CREATE TABLE affiliate_gob_profiles (
    affiliate_id INTEGER PRIMARY KEY REFERENCES affiliates(id) ON DELETE CASCADE,
    nombre_institucion VARCHAR(255),
    rif_nit_gob VARCHAR(50),
    direccion_administrativa TEXT,
    nombre_contacto VARCHAR(255),
    cargo_contacto VARCHAR(255),
    correo_contacto VARCHAR(255),
    telefono_contacto VARCHAR(50),
    referencia_contrato VARCHAR(255)
);

-- PERFIL: EMPRENDEDOR
CREATE TABLE affiliate_emprendedor_profiles (
    affiliate_id INTEGER PRIMARY KEY REFERENCES affiliates(id) ON DELETE CASCADE,
    nombres VARCHAR(255),
    apellidos VARCHAR(255),
    cedula VARCHAR(50),
    nombre_proyecto VARCHAR(255),
    area_proyecto VARCHAR(255),
    direccion TEXT,
    estado VARCHAR(100),
    ciudad VARCHAR(100),
    municipio VARCHAR(100),
    parroquia VARCHAR(100),
    codigo_postal VARCHAR(20),
    correo_emprendedor VARCHAR(255),
    telefono_emprendedor VARCHAR(50),
    descripcion_proyecto TEXT
);

-- DATOS DE COMERCIO (Configuración tras activación)
CREATE TABLE affiliate_commerce_data (
    affiliate_id INTEGER PRIMARY KEY REFERENCES affiliates(id) ON DELETE CASCADE,
    direccion_calle TEXT,
    direccion_numero VARCHAR(50),
    direccion_ciudad VARCHAR(100),
    estado_comercio VARCHAR(100),
    municipio_comercio VARCHAR(100),
    parroquia_comercio VARCHAR(100),
    codigo_postal VARCHAR(20),
    telefono_comercio VARCHAR(50),
    email_administrativo VARCHAR(255),
    sitio_web VARCHAR(255),
    descripcion_negocio TEXT,
    canales_venta JSONB, -- [Tienda Física, E-commerce, etc]
    redes_sociales JSONB, -- {instagram: @user, etc}
    actividad_economica VARCHAR(255),
    fuente_ingresos TEXT,
    volumen_ventas_mensual VARCHAR(100),
    valor_promedio_transaccion VARCHAR(100),
    paises_venta JSONB -- [Venezuela, etc]
);

-- ÍNDICES PARA BÚSQUEDA RÁPIDA
CREATE INDEX idx_auth_username ON auth_users(username);
CREATE INDEX idx_affiliate_status ON affiliates(status);
CREATE INDEX idx_payments_affiliate ON affiliate_payments(affiliate_id);
CREATE INDEX idx_payments_referencia ON affiliate_payments(referencia);
