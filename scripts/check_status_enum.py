import psycopg2
conn = psycopg2.connect(host='localhost', user='postgres', password='canela123$$', dbname='cb_database', port='5432')
cur = conn.cursor()
cur.execute("SELECT enumlabel FROM pg_enum JOIN pg_type ON pg_enum.enumtypid = pg_type.oid WHERE pg_type.typname = 'affiliate_status_enum'")
print([r[0] for r in cur.fetchall()])
conn.close()
