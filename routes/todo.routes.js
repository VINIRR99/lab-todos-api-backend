const { Router } = require('express');

const Todo = require("../models/Todo");

const router = Router();

router.get("/", async (req, res) => {
    try {
      const allTodos = await Todo.find();
      res.status(200).json(allTodos);
    } catch (error) {res.status(500).json({ error: error.message })}
});

module.exports = router;