const { Router } = require('express');

const Todo = require("../models/Todo.model");

const router = Router();

router.get("/", async (req, res) => {
    try {
        const allTodos = await Todo.find();
        res.status(200).json(allTodos);
    } catch (error) {res.status(500).json({ error: error.message })}
});

router.post("/", async (req, res) => {
    try {
        const { _id } = await req.user;

        const User = require("../models/User.model");
        await User.findByIdAndUpdate(_id, { $push: { todos: _id } });

        const { title } = await req.body;

        const newTodo = await Todo.create({ title, user: _id });

        res.status(200).json(newTodo);
    } catch (error) {res.status(500).json({ error: error.message })};
});

router.put("/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTodo);
    } catch (error) {res.status(500).json({ error: error.message })};
});

router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json();
    } catch (error) {res.status(500).json({ error: error.message })};
});

module.exports = router;