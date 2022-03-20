const { Router } = require('express');

const Todo = require("../models/Todo.model");
const User = require("../models/User.model");

const router = Router();

router.get("/", async (req, res) => {
    try {
        const { _id: userId } = await req.user;
        const userTodos = await Todo.find({ user: userId }, { title: 1, completed: 1 });
        res.status(200).json(userTodos);
    } catch (error) {res.status(500).json({ error: error.message })}
});

router.post("/", async (req, res) => {
    try {
        const { _id: userId } = await req.user;
        const { title } = await req.body;

        const { _id: todoId, completed } = await Todo.create({ title, user: userId });
        await User.findByIdAndUpdate(userId, { $push: { todos: todoId } });

        res.status(200).json({ _id: todoId, title, completed });
    } catch (error) {res.status(500).json({ error: error.message })};
});

router.put("/:todoId", async (req, res) => {
    try {
        const { todoId } = req.params;
        const { completed } = await req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(todoId, { completed }, { new: true })
            .select("-user -createdAt -updatedAt -__v");

        res.status(200).json(updatedTodo);
    } catch (error) {res.status(500).json({ error: error.message })};
});

router.delete('/:todoId', async (req, res) => {
    try {
        const { todoId } = req.params;
        const { _id: userId } = await req.user;

        await Todo.findByIdAndDelete(todoId);
        await User.findByIdAndUpdate(userId, { $pull: { todos: todoId } });

        res.status(200).json();
    } catch (error) {res.status(500).json({ error: error.message })};
});

module.exports = router;