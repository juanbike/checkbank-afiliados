import psycopg2
def check_nulls(table_name):
    conn = psycopg2.connect(host='localhost', user='postgres', password='canela123$$', dbname='cb_database', port='5432')
    cur = conn.cursor()
    cur.execute(f"SELECT column_name, is_nullable FROM information_schema.columns WHERE table_name = '{table_name}'")
    print(f"Table {table_name}:")
    for r in cur.fetchall():
        print(f" - {r[0]}: {r[1]}")
    conn.close()

tables = ['affiliate_payments', 'affiliate_commerce_data']
for t in tables:
    check_nulls(t)
