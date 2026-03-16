import psycopg2

def create_manager_role():
    try:
        conn = psycopg2.connect(
            host='localhost', 
            user='postgres', 
            password='canela123$$', 
            dbname='cb_database', 
            port='5432'
        )
        cur = conn.cursor()
        
        # 1. Create the role 'gestor' if it doesn't exist
        cur.execute("SELECT id FROM roles WHERE slug = 'gestor'")
        role_res = cur.fetchone()
        
        if not role_res:
            print("Creating 'gestor' role...")
            cur.execute("INSERT INTO roles (slug, name) VALUES ('gestor', 'Gestor de Afiliados') RETURNING id")
            gestor_role_id = cur.fetchone()[0]
        else:
            gestor_role_id = role_res[0]
            print(f"'gestor' role already exists with ID {gestor_role_id}")

        # 2. Assign permissions to this role
        # Let's find relevant permissions like 'view_affiliates', 'edit_affiliates'
        cur.execute("SELECT id, slug FROM permissions WHERE slug IN ('view_affiliates', 'edit_affiliates', 'manage_affiliates')")
        perms = cur.fetchall()
        
        if not perms:
            # Create permissions if they don't exist
            print("Creating core permissions...")
            perms_to_create = [
                ('view_affiliates', 'Ver Afiliados'),
                ('edit_affiliates', 'Editar Afiliados'),
                ('delete_affiliates', 'Eliminar Afiliados')
            ]
            for slug, name in perms_to_create:
                cur.execute("INSERT INTO permissions (slug, name) VALUES (%s, %s) ON CONFLICT (slug) DO NOTHING", (slug, name))
            
            cur.execute("SELECT id, slug FROM permissions WHERE slug IN ('view_affiliates', 'edit_affiliates', 'delete_affiliates')")
            perms = cur.fetchall()

        for perm_id, perm_slug in perms:
            cur.execute("INSERT INTO role_permissions (role_id, permission_id) VALUES (%s, %s) ON CONFLICT DO NOTHING", (gestor_role_id, perm_id))
        
        # 3. Assign role to mgonzalez
        print(f"Assigning role 'gestor' (ID: {gestor_role_id}) to user 'mgonzalez'...")
        cur.execute("UPDATE auth_users SET role_id = %s WHERE username = 'mgonzalez'", (gestor_role_id,))
        
        conn.commit()
        print("✅ Success!")
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    create_manager_role()
