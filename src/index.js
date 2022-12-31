const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/configuration/swagger");
// const path = require("path");
const app = express();
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const cors = require("cors");
const rootRoute = require("./routes");
app.use(express.json());
app.use(express.static("."));
app.use(cors());
app.use("/api", rootRoute);
const server = app.listen( 8080, () => {
    console.log(`'Listening on port '${server.address().port}`);
});
