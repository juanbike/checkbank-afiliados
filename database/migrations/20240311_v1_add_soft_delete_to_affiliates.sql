-- Migración: Agregar soporte para Soft Delete en afiliados
-- Fecha: 2024-03-11

ALTER TABLE affiliates ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE NULL;
