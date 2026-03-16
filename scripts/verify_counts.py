import psycopg2
conn = psycopg2.connect(host='localhost', user='postgres', password='canela123$$', dbname='cb_database', port='5432')
cur = conn.cursor()
tables = ['affiliates', 'auth_users', 'affiliate_payments', 'affiliate_commerce_data', 'affiliate_natural_profiles']
for t in tables:
    cur.execute(f"SELECT count(*) FROM {t}")
    print(f"Table {t}: {cur.fetchone()[0]} records")
conn.close()
