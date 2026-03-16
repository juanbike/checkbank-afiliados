-- Migración: Vinculación directa Usuario-Afiliado (Versión INTEGER / SERIAL)

-- 1. Intentar eliminar la columna si se creó con el tipo incorrecto antes
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='auth_users' AND column_name='affiliate_id' AND data_type='uuid') THEN
        ALTER TABLE auth_users DROP COLUMN affiliate_id;
    END IF;
END $$;

-- 2. Agregar la columna con el tipo correcto (INTEGER) para que coincida con schema.sql
ALTER TABLE auth_users ADD COLUMN IF NOT EXISTS affiliate_id INTEGER REFERENCES affiliates(id) ON DELETE SET NULL;

-- 3. Vincular registros existentes basados en el email guardado en los pagos
UPDATE auth_users u
SET affiliate_id = p.affiliate_id
FROM affiliate_payments p
WHERE p.detalles_pago->>'email' = u.username
AND u.affiliate_id IS NULL;
