import psycopg2

def reset_creds():
    try:
        conn = psycopg2.connect(
            host='localhost', 
            user='postgres', 
            password='canela123$$', 
            dbname='cb_database', 
            port='5432'
        )
        cur = conn.cursor()
        
        # Hash fijo para '123456' (BCrypt)
        known_hash = '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7.vI7.vI7.vI7.vI7.vI7.vI7.vI7'
        
        users_to_reset = ['admin@consulbank.com.ve', 'alopez', 'cmartinez', 'mgonzalez']
        
        for u in users_to_reset:
            cur.execute("UPDATE auth_users SET password = %s WHERE username = %s", (known_hash, u))
        
        conn.commit()
        
        print("Sincronización completada.\n")
        print(f"{'USUARIO':<30} | {'ROL':<15} | {'CLAVE'}")
        print("-" * 60)
        
        cur.execute("""
            SELECT u.username, r.name 
            FROM auth_users u 
            LEFT JOIN roles r ON u.role_id = r.id 
            WHERE u.username IN ('admin@consulbank.com.ve', 'alopez', 'cmartinez', 'mgonzalez')
        """)
        for row in cur.fetchall():
            print(f"{row[0]:<30} | {row[1] or 'Sin Rol':<15} | 123456")
            
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    reset_creds()
