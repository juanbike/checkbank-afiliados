import psycopg2

def check_and_fix_roles():
    try:
        conn = psycopg2.connect(
            host='localhost', 
            user='postgres', 
            password='canela123$$', 
            dbname='cb_database', 
            port='5432'
        )
        cur = conn.cursor()
        
        # List current roles
        print("Checking roles...")
        cur.execute("SELECT id, slug, name FROM roles")
        roles = cur.fetchall()
        role_slugs = [r[1] for r in roles]
        print(f"Current roles: {roles}")

        # Ensure 'admin' exists
        if 'admin' not in role_slugs:
            print("Creating 'admin' role...")
            cur.execute("INSERT INTO roles (slug, name) VALUES ('admin', 'Administrador') RETURNING id")
            admin_id = cur.fetchone()[0]
        else:
            cur.execute("SELECT id FROM roles WHERE slug = 'admin'")
            admin_id = cur.fetchone()[0]

        # Ensure 'affiliate' exists
        if 'affiliate' not in role_slugs:
            print("Creating 'affiliate' role...")
            cur.execute("INSERT INTO roles (slug, name) VALUES ('affiliate', 'Afiliado') RETURNING id")
            affiliate_id = cur.fetchone()[0]
        else:
            cur.execute("SELECT id FROM roles WHERE slug = 'affiliate'")
            affiliate_id = cur.fetchone()[0]

        # Assignments
        # alopez -> admin
        # cmartinez -> affiliate (already done but safe)
        # mgonzalez -> affiliate (already done but safe)
        
        print(f"Assigning alopez to admin (ID: {admin_id})...")
        cur.execute("UPDATE auth_users SET role_id = %s WHERE username = 'alopez'", (admin_id,))
        
        print(f"Assigning cmartinez to affiliate (ID: {affiliate_id})...")
        cur.execute("UPDATE auth_users SET role_id = %s WHERE username = 'cmartinez'", (affiliate_id,))
        
        print(f"Assigning mgonzalez to affiliate (ID: {affiliate_id})...")
        cur.execute("UPDATE auth_users SET role_id = %s WHERE username = 'mgonzalez'", (affiliate_id,))
        
        conn.commit()
        print("✅ Done!")
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_and_fix_roles()
