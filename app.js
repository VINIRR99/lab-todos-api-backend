require("dotenv").config();

const connectDb = require("./config/db.config");
connectDb();

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.ACCESS_CONTROL_ALLOW_ORIGIN);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    app.use(cors());
    next();
});

app.use("/todo", require("./routes/todo.routes"));

app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`));