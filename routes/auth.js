const express = require("express");
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth")

const router = express.Router();

router.post("/login", async (req, res) => {

    const { username } = req.body;

    const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    );

    const user = result.rows[0];

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if (!isPasswordValid) {

        return res.status(401).json({
            message: "Invalid credentials"
        });

    }

    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    res.json({
        token
    });

});

router.get("/profile", authMiddleware, (req, res) =>{

    res.json({
        user: req.user
    });

});

module.exports = router;