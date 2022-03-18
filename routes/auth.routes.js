const { Router } = require('express');

const User = require("../models/User");

const router = Router();

const { genSalt, hash } = require("bcryptjs");

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });
        if (user) throw new Error("Email already used");

        const salt = await genSalt(12);
        const passwordHash = await hash(password, salt);

        await User.create({ name, email, passwordHash });
        res.status(200).json({ name, email });
    } catch (error) {
        res.status(500).json({ error: error.message })
    };
});

module.exports = router;