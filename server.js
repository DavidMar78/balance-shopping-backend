const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// IMPORT ROUTES
const expensesRoutes = require("./routes/expenses");

// ROUTES API
app.use("/expenses", expensesRoutes);

// SERVIR LE FRONT (React build)
app.use(express.static(path.join(__dirname, "dist"), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
            res.setHeader("Cache-Control", "no-store");
        }
    }
}));

// CATCH ALL (toujours en dernier)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
});

// LISTEN EN DERNIER
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});