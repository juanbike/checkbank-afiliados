import psycopg2
import sys

DB_HOST = 'localhost'
DB_USER = 'postgres'
DB_PASSWORD = 'canela123$$'
DB_NAME = 'cb_database'
DB_PORT = '5432'

def apply_sql(filename):
    try:
        conn = psycopg2.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, dbname=DB_NAME, port=DB_PORT)
        cur = conn.cursor()
        
        with open(filename, 'r') as f:
            sql = f.read()
            
        cur.execute(sql)
        conn.commit()
        print(f"File {filename} applied successfully!")
        conn.close()
    except Exception as e:
        print(f"Error applying {filename}: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        apply_sql(sys.argv[1])
    else:
        print("Usage: python apply_sql.py <filename.sql>")
