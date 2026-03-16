import psycopg2
import os

DB_HOST = 'localhost'
DB_USER = 'postgres'
DB_PASSWORD = 'canela123$$'
DB_NAME = 'cb_database'
DB_PORT = '5432'

def check_columns_and_types(table_name):
    try:
        conn = psycopg2.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, dbname=DB_NAME, port=DB_PORT)
        cur = conn.cursor()
        cur.execute(f"SELECT column_name, data_type FROM information_schema.columns WHERE table_name='{table_name}'")
        columns = cur.fetchall()
        print(f"Columns in {table_name}:")
        for col in columns:
            print(f"- {col[0]} ({col[1]})")
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

check_columns_and_types('affiliates')
print("-" * 20)
check_columns_and_types('auth_users')
