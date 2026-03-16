import psycopg2

DB_HOST = 'localhost'
DB_USER = 'postgres'
DB_PASSWORD = 'canela123$$'
DB_NAME = 'cb_database'
DB_PORT = '5432'

def check_type(table_name, column_name):
    try:
        conn = psycopg2.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, dbname=DB_NAME, port=DB_PORT)
        cur = conn.cursor()
        cur.execute(f"SELECT data_type FROM information_schema.columns WHERE table_name='{table_name}' AND column_name='{column_name}'")
        row = cur.fetchone()
        print(f"Type of {table_name}.{column_name}: {row[0]}")
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

check_type('affiliates', 'id')
check_type('auth_users', 'id')
