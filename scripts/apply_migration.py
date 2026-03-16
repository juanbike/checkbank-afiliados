import psycopg2
import os

DB_HOST = 'localhost'
DB_USER = 'postgres'
DB_PASSWORD = 'canela123$$'
DB_NAME = 'cb_database'
DB_PORT = '5432'

def apply_migration():
    try:
        conn = psycopg2.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, dbname=DB_NAME, port=DB_PORT)
        cur = conn.cursor()
        
        with open('migrate_rbac.sql', 'r') as f:
            sql = f.read()
            
        cur.execute(sql)
        conn.commit()
        print("Migration applied successfully!")
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    apply_migration()
