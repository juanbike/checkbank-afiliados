import bcrypt from 'bcryptjs';

async function gen() {
    const hash = await bcrypt.hash('123456', 10);
    console.log('REAL_HASH_123456:', hash);
}
gen();
