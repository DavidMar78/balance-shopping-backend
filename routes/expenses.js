const express = require("express");
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../middleware/auth")

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Récupère toutes les dépenses
 *     responses:
 *       200:
 *         description: Liste des dépenses
 */
// GET
router.get("/", authMiddleware, async (req, res) => {
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
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { user, shop, sum, detail, date } = req.body;

        console.log(req.body);

        const result = await db.query(
            'INSERT INTO expenses ("user", shop, sum, detail, date) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [user, shop, sum, detail, date]
        );

        res.json({ id: result.rows[0].id });

    } catch (err) {
        res.status(500).send(err.message);
    }
});


// UPDATE
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { user, shop, sum, detail, date } = req.body;

        await db.query(
            'UPDATE expenses SET "user" = $1, shop = $2, sum = $3, detail = $4, date = $5 WHERE id = $6',
            [user, shop, sum, detail, date, id]
        );

        res.json({ message: "Updated" });

    } catch (err) {
        res.status(500).send(err.message);
    }
});


// DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
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