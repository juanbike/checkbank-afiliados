import psycopg2
import bcrypt

def reset_and_list_credentials():
    try:
        conn = psycopg2.connect(
            host='localhost', 
            user='postgres', 
            password='canela123$$', 
            dbname='cb_database', 
            port='5432'
        )
        cur = conn.cursor()
        
        # Salt and hash for '123456'
        default_password = '123456'
        hashed_pw = bcrypt.hashpw(default_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        # Target users
        targets = ['admin@consulbank.com.ve', 'alopez', 'cmartinez', 'mgonzalez']
        
        print(f"Sincronizando contraseñas al valor por defecto: '{default_password}'...\n")
        
        for user in targets:
            cur.execute("UPDATE auth_users SET password = %s WHERE username = %s", (hashed_pw, user))
        
        conn.commit()
        
        # Final list with roles
        query = """
            SELECT u.username, r.name as role_name
            FROM auth_users u
            LEFT JOIN roles r ON u.role_id = r.id
            WHERE u.username IN %s OR u.username LIKE 'user_%%@test.com'
            ORDER BY r.name, u.username
            LIMIT 10;
        """
        cur.execute(query, (tuple(targets),))
        rows = cur.fetchall()
        
        print("CREDENCIALES DE ACCESO (Entorno de Pruebas):")
        print("-" * 50)
        for row in rows:
            print(f"Usuario: {row[0]:<30} | Rol: {row[1]:<15} | Clave: {default_password}")
        
        print("-" * 50)
        print("Nota: Los 40 usuarios generados masivamente ('user_XX@test.com') también usan la misma clave.")
        
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    reset_and_list_credentials()
