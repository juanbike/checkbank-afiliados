const bcrypt = require('bcryptjs');
const password = '123456';
const salt = '$2a$10$fV3.pY8e8Z.7.vI7.vI7.uI7'; // Manual salt to try to match or just gen new
bcrypt.hash(password, 10, (err, hash) => {
    console.log('REAL_HASH:', hash);
});
