import app from "./app.js";
import "./config/setup.js";
var port = process.env.PORT || 5000;
app.listen(port, function () {
    return console.log("Server is running on: http://localhost:".concat(port));
});
