const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
    info: {
        title: "REST API for my Project",
        version: "1.0.0",
        description: "This is the REST API for my Project",
    },
    host: "localhost:8080",
    basePath: "/api", 
};

const options = {
    swaggerDefinition,
    apis: ["src/swagger/docs/**/*.yaml"],
};

module.exports = swaggerJSDoc(options);
