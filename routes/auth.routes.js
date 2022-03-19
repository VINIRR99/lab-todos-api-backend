const { Router } = require('express');

const User = require("../models/User.model");

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

const { sign } = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    const incorrectLogin = "Email or Password is invalid!";

    try {
        const { email, password } = await req.body;
        
        const user = await User.findOne({ email }).populate("todos");
        if (!user) throw new Error(incorrectLogin);

        const { _id, name, passwordHash, todos, createdAt, updatedAt, __v } = await user;

        const compareHash = await compare(password, passwordHash);
        if (!compareHash) throw new Error(incorrectLogin);

        const payload = { _id, name, email, todos, createdAt, updatedAt, __v };

        const token = sign(payload, process.env.SECRET_JWT, { expiresIn: '1day'});

        res.status(200).json({ payload, token });
    } catch (error) {
        if (error.message === incorrectLogin) {
            res.status(404).json({ error: error.message })
        } else res.status(401).json({ error: error.message });
    };
});

module.exports = router;