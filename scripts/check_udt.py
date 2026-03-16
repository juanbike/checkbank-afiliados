import psycopg2
conn = psycopg2.connect(host='localhost', user='postgres', password='canela123$$', dbname='cb_database', port='5432')
cur = conn.cursor()
cur.execute("SELECT column_name, udt_name FROM information_schema.columns WHERE table_name = 'affiliates'")
[print(r) for r in cur.fetchall()]
conn.close()
