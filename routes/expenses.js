const express = require("express");
const router = express.Router();
const db = require("../db");


// GET
router.get("/", async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM expenses ORDER BY date DESC'
        );

        res.json(result.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
});


// POST
router.post("/", async (req, res) => {
    try {
        const { user, shop, sum, date } = req.body;

        const result = await db.query(
            'INSERT INTO expenses ("user", shop, sum, date) VALUES ($1, $2, $3, $4) RETURNING id',
            [user, shop, sum, date]
        );

        res.json({ id: result.rows[0].id });

    } catch (err) {
        res.status(500).send(err.message);
    }
});


// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { user, shop, sum, date } = req.body;

        await db.query(
            'UPDATE expenses SET "user" = $1, shop = $2, sum = $3, date = $4 WHERE id = $5',
            [user, shop, sum, date, id]
        );

        res.json({ message: "Updated" });

    } catch (err) {
        res.status(500).send(err.message);
    }
});


// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            "DELETE FROM expenses WHERE id = $1",
            [id]
        );

        res.json({ message: "Deleted" });

    } catch (err) {
        res.status(500).send(err.message);
    }
});


module.exports = router;