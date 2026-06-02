const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Balance Shopping API",
            version: "1.0.0",
            description: "API de gestion des dépenses",
        },
        servers: [
            {
                url: "http://localhost:3002",
            },
        ],
    },
    apis: ["./routes/*.js"],
};



module.exports = swaggerJsdoc(options);