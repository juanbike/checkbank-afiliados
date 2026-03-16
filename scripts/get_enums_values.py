import psycopg2

def get_enum_values(enum_name):
    conn = psycopg2.connect(host='localhost', user='postgres', password='canela123$$', dbname='cb_database', port='5432')
    cur = conn.cursor()
    cur.execute(f"SELECT enumlabel FROM pg_enum JOIN pg_type ON pg_enum.enumtypid = pg_type.oid WHERE pg_type.typname = '{enum_name}'")
    values = [r[0] for r in cur.fetchall()]
    conn.close()
    return values

print(f"client_type_enum: {get_enum_values('client_type_enum')}")
print(f"plan_type_enum: {get_enum_values('plan_type_enum')}")
print(f"payment_period_enum: {get_enum_values('payment_period_enum')}")
print(f"status_enum: {get_enum_values('status_enum')}")
