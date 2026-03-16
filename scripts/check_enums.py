import psycopg2

DB_HOST = 'localhost'
DB_USER = 'postgres'
DB_PASSWORD = 'canela123$$'
DB_NAME = 'cb_database'
DB_PORT = '5432'

def check_enums():
    try:
        conn = psycopg2.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, dbname=DB_NAME, port=DB_PORT)
        cur = conn.cursor()
        cur.execute("SELECT t.typname, e.enumlabel FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid")
        enums = cur.fetchall()
        print("Enums in database:")
        for enum in enums:
            print(f"- {enum[0]}: {enum[1]}")
        
        cur.execute("SELECT column_name, data_type, udt_name FROM information_schema.columns WHERE table_name = 'affiliates'")
        cols = cur.fetchall()
        print("\nAffiliates table columns:")
        for col in cols:
            print(f"- {col[0]}: {col[1]} ({col[2]})")
            
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_enums()
