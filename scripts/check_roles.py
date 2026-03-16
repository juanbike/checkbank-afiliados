import psycopg2

DB_HOST = 'localhost'
DB_USER = 'postgres'
DB_PASSWORD = 'canela123$$'
DB_NAME = 'cb_database'
DB_PORT = '5432'

def check_roles():
    try:
        conn = psycopg2.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, dbname=DB_NAME, port=DB_PORT)
        cur = conn.cursor()
        cur.execute("SELECT id, name, slug FROM roles")
        rows = cur.fetchall()
        print("Roles in database:")
        for row in rows:
            print(f"- {row[0]}: {row[1]} ({row[2]})")
        
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_roles()
