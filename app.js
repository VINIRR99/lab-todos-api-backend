require("dotenv").config();

const connectDb = require("./config/db.config");
connectDb();

const express = require("express");
const app = express();
app.use(express.json());

app.use("/todo", require("./routes/todo.routes"));

app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`));