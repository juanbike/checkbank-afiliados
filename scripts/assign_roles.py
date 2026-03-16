import psycopg2

def manage_roles():
    try:
        conn = psycopg2.connect(
            host='localhost', 
            user='postgres', 
            password='canela123$$', 
            dbname='cb_database', 
            port='5432'
        )
        cur = conn.cursor()
        
        # 1. Ver roles disponibles
        print("Roles disponibles:")
        cur.execute("SELECT id, slug, name FROM roles")
        roles = cur.fetchall()
        role_map = {r[1]: r[0] for r in roles}
        for r in roles:
            print(f" - {r[1]} (ID: {r[0]})")
            
        # 2. Asignar roles (Ejemplo: alopez como admin, los otros como affiliate)
        # alopez -> admin, cmartinez -> affiliate, mgonzalez -> affiliate
        assignments = [
            ('alopez', role_map.get('admin')),
            ('cmartinez', role_map.get('affiliate')),
            ('mgonzalez', role_map.get('affiliate'))
        ]
        
        print("\nActualizando usuarios...")
        for username, role_id in assignments:
            if role_id:
                cur.execute(
                    "UPDATE auth_users SET role_id = %s WHERE username = %s",
                    (role_id, username)
                )
                print(f"✅ Usuario '{username}' actualizado con rol ID {role_id}.")
            else:
                print(f"⚠️ No se encontró el rol para {username}.")
        
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    manage_roles()
