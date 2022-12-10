const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.static("."));
const cors = require("cors");
const rootRoute = require("./routes");
app.use(cors());
app.listen(8080, () => console.log("sever 8080 is running"));
app.use("/api", rootRoute);
// app.get("/file/:name", function (req, res, next) {
//     var options = {
//         root: path.relative("../public/img"),
//     };
//     console.log(options.root);
//     var fileName = req.params.name;
//     res.sendFile(fileName, options, function (err) {
//         if (err) {
//             next(err);
//         } else {
//             console.log("Sent:", fileName);
//         }
//     });
// });
