import os
import random
import string
import uuid
from datetime import datetime, date
import psycopg2

# Configuración de base de datos
DB_CONFIG = {
    'host': 'localhost',
    'user': 'postgres',
    'password': 'canela123$$',
    'dbname': 'cb_database',
    'port': '5432'
}

# Listas para datos aleatorios realistas
CLIENT_TYPES = ['natural', 'juridica', 'firma_personal', 'ente_gubernamental', 'emprendedor']
PLANS = ['basico', 'estandar', 'premium']
PERIODS = ['mensual', 'semestral', 'anual']
STATUSES = ['active', 'pending']
ESTADOS = ['Distrito Capital', 'Miranda', 'Carabobo', 'Zulia', 'Lara', 'Aragua', 'Bolívar', 'Anzoátegui']
CIUDADES = ['Caracas', 'Valencia', 'Maracaibo', 'Barquisimeto', 'Maracay', 'Puerto La Cruz']

def get_random_string(length=8):
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))

def generate_and_seed(count=40):
    sql_lines = []
    pwd_hash = '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7'

    print(f"Generando {count} registros...")

    for i in range(1, count + 1):
        aff_id = str(uuid.uuid4())
        client_type = random.choice(CLIENT_TYPES)
        email = f"user_{i}_{get_random_string(2)}@dummy.com"
        plan = random.choice(PLANS)
        period = random.choice(PERIODS)
        status = random.choice(STATUSES)
        estado = random.choice(ESTADOS)
        ciudad = random.choice(CIUDADES)
        
        # 1. Base Affiliate
        sql_lines.append(f"INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ('{aff_id}', '{client_type}'::client_type_enum, '{plan}'::plan_type_enum, '{period}'::payment_period_enum, '{status}'::affiliate_status_enum);")
        
        # 2. Auth User
        sql_lines.append(f"INSERT INTO auth_users (id, username, password, full_name, role, affiliate_id, role_id) VALUES ('{uuid.uuid4()}', '{email}', '{pwd_hash}', 'Prueba {i}', 'affiliate', '{aff_id}', (SELECT id FROM roles WHERE slug = 'affiliate' LIMIT 1));")
        
        # 3. Specific Profiles
        if client_type == 'natural':
            sql_lines.append(f"""INSERT INTO affiliate_natural_profiles 
                (affiliate_id, nombres, apellidos, documento_identidad, fecha_nacimiento, genero, profesion_ocupacion, direccion_principal, estado, ciudad, municipio, parroquia, codigo_postal, correo_electronico, telefono_movil) 
                VALUES ('{aff_id}', 'N-{i}', 'A-{i}', 'V{random.randint(10,30)}00{i}', '1990-01-01', 'Masculino', 'Ingeniero', 'Av Libertador', '{estado}', '{ciudad}', 'Municipio {i}', 'Parroquia {i}', '1010', '{email}', '0414-0000{i}');""")
        elif client_type == 'juridica':
            sql_lines.append(f"""INSERT INTO affiliate_juridica_profiles 
                (affiliate_id, razon_social, rif_nit, domicilio_fiscal, estado, ciudad, municipio, parroquia, codigo_postal, rep_nombres, rep_apellidos, rep_documento, correo_corporativo, telefono_fijo) 
                VALUES ('{aff_id}', 'Empresa {i} CA', 'J-{random.randint(10,90)}00{i}', 'Edf Torre {i}', '{estado}', '{ciudad}', 'Municipio {i}', 'Parroquia {i}', '1010', 'Rep {i}', 'Last {i}', 'V-{i}', '{email}', '0212-0000{i}');""")
        elif client_type == 'firma_personal':
            sql_lines.append(f"""INSERT INTO affiliate_firma_profiles 
                (affiliate_id, nombre_firma, rif_firma, nombre_titular, cedula_titular, direccion_fiscal, estado, ciudad, municipio, parroquia, codigo_postal, correo_firma, telefono_firma, actividad_comercial) 
                VALUES ('{aff_id}', 'Firma {i}', 'V-{i}', 'Titular {i}', 'V-{i}', 'Direccion {i}', '{estado}', '{ciudad}', 'Municipio {i}', 'Parroquia {i}', '1010', '{email}', '0424-0000{i}', 'Comercio');""")
        elif client_type == 'ente_gubernamental':
            sql_lines.append(f"""INSERT INTO affiliate_gob_profiles 
                (affiliate_id, nombre_institucion, rif_nit_gob, direccion_administrativa, nombre_contacto, cargo_contacto, correo_contacto, telefono_contacto, referencia_contrato) 
                VALUES ('{aff_id}', 'Institución {i}', 'G-000{i}', 'Sede {i}', 'Contacto {i}', 'Director', '{email}', '0800-000{i}', 'CTR-{i}');""")
        elif client_type == 'emprendedor':
            sql_lines.append(f"""INSERT INTO affiliate_emprendedor_profiles 
                (affiliate_id, nombres, apellidos, cedula, nombre_proyecto, area_proyecto, direccion, estado, ciudad, municipio, parroquia, codigo_postal, correo_emprendedor, telefono_emprendedor, descripcion_proyecto) 
                VALUES ('{aff_id}', 'Emp {i}', 'Last {i}', 'V-{i}', 'Proyecto {i}', 'Tech', 'Direccion {i}', '{estado}', '{ciudad}', 'Muni {i}', 'Parr {i}', '1010', '{email}', '0416-000{i}', 'Desc {i}');""")

        # 4. Commerce & Payments
        sql_lines.append(f"INSERT INTO affiliate_commerce_data (affiliate_id, direccion_calle, direccion_numero, direccion_ciudad, estado_comercio, municipio_comercio, codigo_postal, telefono_comercio, email_administrativo, actividad_economica) VALUES ('{aff_id}', 'Calle {i}', 'No {i}', '{ciudad}', '{estado}', 'Municipio {i}', '1010', '0212-000{i}', '{email}', 'Retail');")
        sql_lines.append(f"INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, fecha_pago, monto, moneda, status) VALUES ('{aff_id}', 'Transferencia', 'TX-{i}{get_random_string(2).upper()}', NOW(), {random.randint(50,1000)}, 'USD', 'approved');")

    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cur = conn.cursor()
        cur.execute("BEGIN;")
        for line in sql_lines:
            try:
                cur.execute(line)
            except Exception as line_e:
                print(f"❌ Error en SQL: {line_e}")
                print(f"DEBUG: {line}")
                conn.rollback()
                return
        conn.commit()
        print(f"✅ Se han generado e insertado {count} registros exitosamente.")
        
    except Exception as e:
        print(f"❌ Error general: {e}")
    finally:
        if conn: conn.close()

if __name__ == "__main__":
    generate_and_seed(40)
