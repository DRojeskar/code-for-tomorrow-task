const bcrypt = require('bcryptjs');

bcrypt.hash('Admin123!@#', 10, (err, hash) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Hashed Password:', hash);
    }
});
