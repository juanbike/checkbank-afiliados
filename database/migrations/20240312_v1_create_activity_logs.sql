-- Migración: Crear tabla de historial de actividades (Activity Logs)
-- Fecha: 2024-03-12

CREATE TABLE IF NOT EXISTS activity_logs (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth_users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id VARCHAR(100),
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsquedas rápidas por entidad
CREATE INDEX idx_activity_entity ON activity_logs(entity_type, entity_id);
-- Índice para búsquedas por usuario
CREATE INDEX idx_activity_user ON activity_logs(user_id);
-- Índice por fecha
CREATE INDEX idx_activity_created_at ON activity_logs(created_at DESC);
