const { Router } = require('express');

const User = require("../models/User");

const router = Router();

const { genSalt, hash, compare } = require("bcryptjs");

router.post("/signup", async (req, res) => {
    const emailError = "Email already used";

    try {
        const { name, email, password } = await req.body;

        const user = await User.findOne({ email });
        if (user) throw new Error(emailError);

        const salt = await genSalt(12);
        const passwordHash = await hash(password, salt);

        await User.create({ name, email, passwordHash });
        res.status(200).json({ name, email });
    } catch (error) {
        if (error.message === emailError) {
            res.status(409).json({ error: error.message })
        } else res.status(500).json({ error: error.message });
    };
});

router.post("/login", async (req, res) => {
    const incorrectLogin = "Email or Password is invalid";

    try {
        const { email, password } = await req.body;
        
        const user = await User.findOne({ email });
        if (!user) throw new Error(incorrectLogin);

        const compareHash = await compare(password, user.passwordHash);
        if (!compareHash) throw new Error(incorrectLogin);

        res.status(200).json({ message: `User "${user.name}" loggedIn` });
    } catch (error) {
        if (error.message === incorrectLogin) {
            res.status(404).json({ error: error.message })
        } else res.status(401).json({ error: error.message });
    };
});

module.exports = router;