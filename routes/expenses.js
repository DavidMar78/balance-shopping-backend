const express = require("express");
const router = express.Router();
const db = require("../db");


// GET
router.get("/", (req,res) => {
    db.all("SELECT * FROM expenses ORDER BY date DESC", [], (err, rows) => {
        if (err) {return res.status(500).send(err.message)}

        res.json(rows);
    });
});


// POST
router.post("/", (req, res) => {
    const { user, shop, sum, date } = req.body;
    db.run(
        "INSERT INTO expenses (user, shop, sum, date) VALUES (?, ?, ?, ?)",
        [user, shop, sum, date],
        function (err) {
            if (err) {return res.status(500).send(err.message)}

            res.json({ id: this.lastID });
        }
    );
});


// UPDATE
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { user, shop, sum, date } = req.body;

    db.run(
        "UPDATE expenses SET user = ?, shop = ?, sum = ?, date = ? WHERE id = ?",
        [user, shop, sum, date, id],
        function (err) {
            if (err) {return res.status(500).send(err.message)}

            res.json({ message: "Updated", changes: this.changes});
        });
});


// DELETE
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM expenses WHERE id = ?", [id], function (err) {
            if (err) {return res.status(500).send(err.message)}

            res.json({ message: "Deleted", changes: this.changes });
        });
});


module.exports = router;