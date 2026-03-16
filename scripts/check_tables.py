import psycopg2
import os

DB_HOST = 'localhost'
DB_USER = 'postgres'
DB_PASSWORD = 'canela123$$'
DB_NAME = 'cb_database'
DB_PORT = '5432'

try:
    conn = psycopg2.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        dbname=DB_NAME,
        port=DB_PORT
    )
    cur = conn.cursor()
    cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public'")
    tables = cur.fetchall()
    print("Tables in database:")
    for table in tables:
        print(f"- {table[0]}")
    conn.close()
except Exception as e:
    print(f"Error: {e}")
