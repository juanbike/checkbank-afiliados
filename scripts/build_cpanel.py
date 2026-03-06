import os
import subprocess
import zipfile
import shutil
import sys

# Definir rutas base
BASE_DIR = r"c:\afiliados"
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")
BACKEND_DIR = os.path.join(BASE_DIR, "backend")
TMP_DIR = os.path.join(BASE_DIR, ".tmp")

def ensure_dir_exists(path):
    if not os.path.exists(path):
        os.makedirs(path)

def zip_directory(directory_path, zip_path):
    print(f"📦 Comprimiendo {directory_path} en {zip_path}...")
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(directory_path):
            for file in files:
                file_path = os.path.join(root, file)
                # Mantener la estructura interna relativa
                arcname = os.path.relpath(file_path, directory_path)
                zipf.write(file_path, arcname)

def build_frontend():
    print("====================================")
    print("▶️ Iniciando Build del Frontend")
    print("====================================")
    
    try:
        # 1. NPM Run Build
        print("⚙️ Ejecutando 'npm run build'...")
        subprocess.run(["npm", "run", "build"], cwd=FRONTEND_DIR, shell=True, check=True)
        
        # 2. Inyectar .htaccess
        dist_dir = os.path.join(FRONTEND_DIR, "dist")
        if not os.path.exists(dist_dir):
            print("❌ Error: La carpeta 'dist' del frontend no se generó.")
            return False
            
        print("📄 Creando archivo .htaccess...")
        htaccess_path = os.path.join(dist_dir, ".htaccess")
        htaccess_content = """<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>"""
        with open(htaccess_path, "w") as f:
            f.write(htaccess_content)
            
        # 3. Comprimir la carpeta dist
        zip_path = os.path.join(TMP_DIR, "frontend_cpanel.zip")
        zip_directory(dist_dir, zip_path)
        print("✅ Frontend preparado exitosamente.")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error durante el build del frontend: {e}")
        return False
    except Exception as e:
        print(f"❌ Error inesperado en frontend: {e}")
        return False

def build_backend():
    print("\n====================================")
    print("▶️ Iniciando Build del Backend")
    print("====================================")
    
    try:
        # 1. NPM Run Build
        print("⚙️ Ejecutando 'npm run build' (tsc)...")
        subprocess.run(["npm", "run", "build"], cwd=BACKEND_DIR, shell=True, check=True)
        
        # 2. Recolectar archivos para el ZIP (dist, package.json, .env)
        dist_dir = os.path.join(BACKEND_DIR, "dist")
        if not os.path.exists(dist_dir):
            print("❌ Error: La carpeta 'dist' del backend no se generó.")
            return False
            
        zip_path = os.path.join(TMP_DIR, "backend_cpanel.zip")
        print(f"📦 Empaquetando backend en {zip_path}...")
        
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            # Añadir carpeta dist (y su contenido interno)
            for root, _, files in os.walk(dist_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    # La ruta raiz dentro del zip debe ser 'dist/...', no su interior suelto
                    arcname = os.path.join("dist", os.path.relpath(file_path, dist_dir))
                    zipf.write(file_path, arcname)
            
            # Añadir package.json
            pkg_path = os.path.join(BACKEND_DIR, "package.json")
            if os.path.exists(pkg_path):
                zipf.write(pkg_path, "package.json")
            else:
                print("⚠ Advertencia: No se encontró package.json")
                
            # Añadir .env
            env_path = os.path.join(BACKEND_DIR, ".env")
            if not os.path.exists(env_path):
                # Probar en la raíz si no está en backend
                env_path = os.path.join(BASE_DIR, ".env")

            if os.path.exists(env_path):
                zipf.write(env_path, ".env")
                print(f"✅ Archivo .env incluido desde: {env_path}")
            else:
                print("⚠ Advertencia: No se encontró .env (asegúrate de crearlo manualmente en cPanel).")

        print("✅ Backend preparado exitosamente.")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error durante el build del backend: {e}")
        return False
    except Exception as e:
        print(f"❌ Error inesperado en backend: {e}")
        return False

if __name__ == "__main__":
    ensure_dir_exists(TMP_DIR)
    print(f"📁 Directorio de salida preparado: {TMP_DIR}")
    
    front_ok = build_frontend()
    back_ok = build_backend()
    
    if front_ok and back_ok:
        print("\n🎉 ¡Proceso completado! Busca tus archivos ZIP en 'c:\\afiliados\\.tmp\\'")
    else:
        print("\n⚠️ El proceso finalizó con errores. Revisa los logs arriba.")
        sys.exit(1)
