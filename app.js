require("dotenv").config();

const connectDb = require("./config/db.config");
connectDb();

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use("/todo", require("./routes/todo.routes"));

app.listen(process.env.PORT, () => console.log(`
Server running on port: ${process.env.PORT}
origin: ${process.env.ACCESS_CONTROL_ALLOW_ORIGIN}
methods: ["GET", "POST", "PUT", "DELETE"]
`));