import psycopg2

def get_users_by_role():
    try:
        conn = psycopg2.connect(
            host='localhost', 
            user='postgres', 
            password='canela123$$', 
            dbname='cb_database', 
            port='5432'
        )
        cur = conn.cursor()
        
        query = """
            SELECT 
                r.name as role_name,
                u.username,
                u.full_name,
                u.branch,
                COALESCE(u.affiliate_id::text, 'No vinculado') as affiliate_id
            FROM auth_users u
            LEFT JOIN roles r ON u.role_id = r.id
            ORDER BY r.name, u.username;
        """
        
        cur.execute(query)
        rows = cur.fetchall()
        
        current_role = None
        for row in rows:
            role_name = row[0] or "Sin Rol Asignado"
            if role_name != current_role:
                print(f"\n===== ROL: {role_name.upper()} =====")
                current_role = role_name
            
            print(f" - Usuario: {row[1]}")
            print(f"   Nombre: {row[2]}")
            print(f"   Sucursal: {row[3] or 'N/A'}")
            print(f"   Afiliado ID: {row[4]}")
            print("-" * 30)
            
        conn.close()
    except Exception as e:
        print(f"Error al consultar usuarios: {e}")

if __name__ == "__main__":
    get_users_by_role()
