const bcrypt = require("bcrypt");

async function hashPassword() {
    const password = "W3lcome66759";

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);
}

hashPassword();