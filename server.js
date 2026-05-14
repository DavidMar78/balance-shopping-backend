require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// IMPORT ROUTES
const expensesRoutes = require("./routes/expenses");

// ROUTES API
app.use("/expenses", expensesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});