import psycopg2

def check_table(table_name):
    conn = psycopg2.connect(host='localhost', user='postgres', password='canela123$$', dbname='cb_database', port='5432')
    cur = conn.cursor()
    cur.execute(f"SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '{table_name}'")
    cols = cur.fetchall()
    print(f"Table {table_name}:")
    for col in cols:
        print(f" - {col[0]} ({col[1]})")
    conn.close()

tables = ['affiliate_payments', 'affiliate_commerce_data', 'affiliate_natural_profiles']
for t in tables:
    check_table(t)
