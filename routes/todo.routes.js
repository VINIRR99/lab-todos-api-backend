const { Router } = require('express');

const Todo = require("../models/Todo");

const router = Router();

router.get("/", async (req, res) => {
    try {
        const allTodos = await Todo.find();
        res.status(200).json(allTodos);
    } catch (error) {res.status(500).json({ error: error.message })}
});

router.post("/", async (req, res) => {
    try {
        const newTodo = await Todo.create(req.body);
        res.status(201).json(newTodo);
    } catch (error) {res.status(500).json({ error: error.message })};
});

module.exports = router;