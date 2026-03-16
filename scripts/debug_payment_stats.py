import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

# Load environment variables
dotenv_path = os.path.join('c:/afiliados/backend', '.env')
load_dotenv(dotenv_path)

def check_payment_stats():
    try:
        conn = psycopg2.connect(
            host=os.getenv('DB_HOST'),
            database=os.getenv('DB_NAME'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASS'),
            port=os.getenv('DB_PORT')
        )
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        print("Checking affiliate_payments table...")
        cur.execute("SELECT COUNT(*) FROM affiliate_payments")
        count = cur.fetchone()['count']
        print(f"Total payments: {count}")
        
        print("\nChecking stats by method...")
        cur.execute("""
            SELECT metodo_pago as method, COUNT(*), SUM(monto) as total_amount 
            FROM affiliate_payments 
            GROUP BY metodo_pago
        """)
        stats = cur.fetchall()
        for row in stats:
            print(row)
            
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_payment_stats()
