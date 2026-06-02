require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger")
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// IMPORT ROUTES
const expensesRoutes = require("./routes/expenses");
const authRoutes = require("./routes/auth");

// ROUTES API
app.use("/expenses", expensesRoutes);
app.use("/auth", authRoutes);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(JSON.stringify(swaggerSpec, null, 2));

});
