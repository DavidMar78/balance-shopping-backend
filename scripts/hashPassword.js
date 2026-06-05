const bcrypt = require("bcrypt");

async function hashPassword() {
    const password = process.argv[2];

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);
}

hashPassword();