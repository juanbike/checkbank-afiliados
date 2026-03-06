import os
import random
import string
from datetime import datetime

# Configuración de tipos y listas para datos aleatorios realistas
CLIENT_TYPES = ['natural', 'juridica', 'firma_personal', 'ente_gubernamental', 'emprendedor']
PLANS = ['Plan Emprendedor', 'Plan Profesional', 'Plan Corporativo']
PERIODS = ['mensual', 'anual']
STATUSES = ['active', 'pending']
ESTADOS = ['Distrito Capital', 'Miranda', 'Carabobo', 'Zulia', 'Lara', 'Aragua']
BANCOS = ['Banco de Venezuela', 'Banesco', 'Mercantil', 'BBVA Provincial', 'BNC']

def get_random_string(length=8):
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))

def generate_bulk_sql(count=40):
    sql_lines = ["-- INSERCIÓN MASIVA DE DATOS DE PRUEBA (40 REGISTROS)", "BEGIN;"]
    
    for i in range(1, count + 1):
        # 1. Datos base
        client_type = random.choice(CLIENT_TYPES)
        email = f"user{i}_{get_random_string(4)}@example.com"
        ref_pago = f"REF{random.randint(100000, 999999)}"
        plan = random.choice(PLANS)
        period = random.choice(PERIODS)
        status = random.choice(STATUSES)
        
        # 2. Insertar en affiliates
        sql_lines.append(f"-- Registro {i}: {client_type.upper()}")
        sql_lines.append(f"INSERT INTO affiliates (id, client_type, plan, payment_period, status) VALUES ({i}, '{client_type}', '{plan}', '{period}', '{status}');")
        
        # 3. Insertar en auth_users (password: '123456' hasheado)
        pwd_hash = '$2a$10$8K7/6fQ5I.6H5M/TzqX.YeLia8C5iS8E6J1YhH6bX5bX5bX5bX5bX' 
        sql_lines.append(f"INSERT INTO auth_users (username, password, full_name, role) VALUES ('{email}', '{pwd_hash}', 'Usuario de Prueba {i}', 'affiliate');")
        
        # 4. Insertar en affiliate_payments
        monto = random.randint(10, 500)
        sql_lines.append(f"INSERT INTO affiliate_payments (affiliate_id, metodo_pago, referencia, monto, moneda, status) VALUES ({i}, 'Transferencia', '{ref_pago}', {monto}, 'USD', 'approved');")
        
        # 5. Insertar Perfil según tipo (Ejemplos básicos para no saturar)
        if client_type == 'natural':
            sql_lines.append(f"INSERT INTO affiliate_natural_profiles (affiliate_id, nombres, apellidos, documento_identidad, correo_electronico, estado) VALUES ({i}, 'Nombre{i}', 'Apellido{i}', 'V{random.randint(10,30)}000000', '{email}', '{random.choice(ESTADOS)}');")
        elif client_type == 'juridica':
            sql_lines.append(f"INSERT INTO affiliate_juridica_profiles (affiliate_id, razon_social, rif_nit, correo_corporativo, estado) VALUES ({i}, 'Empresa {i} C.A.', 'J-{random.randint(10,90)}000000', '{email}', '{random.choice(ESTADOS)}');")
        elif client_type == 'firma_personal':
            sql_lines.append(f"INSERT INTO affiliate_firma_profiles (affiliate_id, nombre_firma, rif_firma, correo_firma, estado) VALUES ({i}, 'Firma {i}', 'V-{random.randint(10,30)}000000', '{email}', '{random.choice(ESTADOS)}');")
        elif client_type == 'emprendedor':
            sql_lines.append(f"INSERT INTO affiliate_emprendedor_profiles (affiliate_id, nombres, nombre_proyecto, correo_emprendedor, estado) VALUES ({i}, 'Emprendedor {i}', 'Proyecto {i}', '{email}', '{random.choice(ESTADOS)}');")
        else: # gob
            sql_lines.append(f"INSERT INTO affiliate_gob_profiles (affiliate_id, nombre_institucion, rif_nit_gob, correo_contacto) VALUES ({i}, 'Ministerio {i}', 'G-20000000', '{email}');")

        # 6. Datos de comercio
        sql_lines.append(f"INSERT INTO affiliate_commerce_data (affiliate_id, email_administrativo, estado_comercio, actividad_economica) VALUES ({i}, '{email}', '{random.choice(ESTADOS)}', 'Comercio General');")
        sql_lines.append("") # Espacio entre registros

    sql_lines.append("COMMIT;")
    
    output_path = r"c:\afiliados\seed_data_40.sql"
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("\n".join(sql_lines))
    print(f"✅ Archivo SQL generado con éxito en: {output_path}")

if __name__ == "__main__":
    generate_bulk_sql(40)
