const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// import routes
const expensesRoutes = require("./routes/expenses");

// utiliser les routes
app.use("/expenses", expensesRoutes);

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

const path = require("path");

// Servir les fichiers React
app.use(express.static(path.join(__dirname, "dist")));

// Pour React Router
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
});