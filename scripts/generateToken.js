const jwt = require("jsonwebtoken");
require("dotenv").config();

const payload = {
    id: 1,
    username: "david",
    role: "admin"
};

const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
);
