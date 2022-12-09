const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("."));
const cors = require("cors");
const rootRoute = require("./routes");
app.use(cors());
app.listen(8080, () => console.log("sever 8080 is running"));
app.use("/api", rootRoute);
