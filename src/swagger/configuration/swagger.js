const swaggerJSDoc = require("swagger-jsdoc");
const { db_host } = require("../../config/index");
const swaggerDefinition = {
    info: {
        title: "REST API for my Project",
        version: "1.0.0",
        description: "This is the REST API for my Project",
    },
    // host: "localhost:8080",
    //when deploy
    host: "178.128.222.31:3600",
    // host: `${db_host}`,
    basePath: "/api",
};

const options = {
    swaggerDefinition,
    apis: ["src/swagger/docs/**/*.yaml"],
};

module.exports = swaggerJSDoc(options);
