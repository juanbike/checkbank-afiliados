import os
import psycopg2
import sys
from datetime import datetime

# Configuración de base de datos
DB_CONFIG = {
    'host': 'localhost',
    'user': 'postgres',
    'password': 'canela123$$',
    'dbname': 'cb_database',
    'port': '5432'
}

MIGRATIONS_DIR = r'c:\afiliados\database\migrations'

def run_migrations():
    conn = None
    try:
        # 1. Conectar a la DB
        conn = psycopg2.connect(**DB_CONFIG)
        cur = conn.cursor()
        
        # 2. Crear tabla de control si no existe
        cur.execute("""
            CREATE TABLE IF NOT EXISTS migrations (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        conn.commit()
        
        # 3. Obtener migraciones ya aplicadas
        cur.execute("SELECT name FROM migrations")
        applied_migrations = {row[0] for row in cur.fetchall()}
        
        # 4. Leer archivos de la carpeta de migraciones
        if not os.path.exists(MIGRATIONS_DIR):
            os.makedirs(MIGRATIONS_DIR)
            
        all_files = sorted([f for f in os.listdir(MIGRATIONS_DIR) if f.endswith('.sql')])
        
        to_apply = [f for f in all_files if f not in applied_migrations]
        
        if not to_apply:
            print("✅ No hay migraciones pendientes.")
            return

        print(f"🚀 Encontradas {len(to_apply)} migraciones pendientes.")

        # 5. Aplicar migraciones una por una
        for filename in to_apply:
            print(f"--- Aplicando: {filename} ---")
            filepath = os.path.join(MIGRATIONS_DIR, filename)
            
            with open(filepath, 'r', encoding='utf-8') as f:
                sql = f.read()
            
            try:
                # Ejecutar dentro de una sub-transacción o manejar por archivo
                cur.execute(sql)
                cur.execute("INSERT INTO migrations (name) VALUES (%s)", (filename,))
                conn.commit()
                print(f"✅ Éxito: {filename}")
            except Exception as e:
                conn.rollback()
                print(f"❌ ERROR al aplicar {filename}: {e}")
                sys.exit(1)

        print("\n🎉 Todas las migraciones se aplicaron correctamente.")

    except Exception as e:
        print(f"❌ Error de conexión: {e}")
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    run_migrations()
