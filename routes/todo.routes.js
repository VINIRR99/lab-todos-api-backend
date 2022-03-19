const { Router } = require('express');

const Todo = require("../models/Todo.model");

const router = Router();

router.get("/", async (req, res) => {
    try {
        const { _id } = await req.user;
        const userTodos = await Todo.find({ user: _id }, { title: 1, completed: 1 });
        res.status(200).json(userTodos);
    } catch (error) {res.status(500).json({ error: error.message })}
});

router.post("/", async (req, res) => {
    try {
        const { _id: userId } = await req.user;

        const { title } = await req.body;

        const { _id, completed } = await Todo.create({ title, user: userId });

        const User = require("../models/User.model");
        await User.findByIdAndUpdate(userId, { $push: { todos: userId } });

        res.status(200).json({ _id, title, completed });
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