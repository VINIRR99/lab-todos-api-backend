const { Router } = require('express');

const User = require("../models/User.model");

const router = Router();

const { genSalt, hash, compare } = require("bcryptjs");

const { sign } = require("jsonwebtoken");
/*
router.post("/signup", async (req, res) => {
    const emailError = "Email already used";
    const passwordRequired = "Password is required!";

    try {
        const { name, email, password } = await req.body;

        if (password.length === 0) throw new Error(passwordRequired);

        const user = await User.findOne({ email });
        if (user) throw new Error(emailError);

        const salt = await genSalt(12);
        const passwordHash = await hash(password, salt);

        const { _id, todos } = await User.create({ name, email, passwordHash });

        const payload = { _id, name, email, todos };

        const token = sign(payload, process.env.SECRET_JWT, { expiresIn: '1day'});

        res.status(200).json({ payload, token });
    } catch (error) {
        switch (error.message) {
            case emailError:
                res.status(409).json({ error: error.message });
                break;
            case passwordRequired:
                res.status(409).json({ error: error.message });
                break;
            default:
                res.status(500).json({ error: error.message });
        };
    };
}); */

router.post("/signup", async (req, res) => {
    const passwordRequired = "Password is required!";
    const passwordRepeatRequired = "Password repeat is required!";
    const passwordChecksDifferent = "Password checks are different!";
    const emailError = "Email already used!";

    try {
        const { name, email, password, passwordRepeat } = await req.body;

        if (password.length === 0) throw new Error(passwordRequired);
        if ((password.length > 0) && (passwordRepeat.length === 0)) throw new Error(passwordRepeatRequired);
        if (password !== passwordRepeat) throw new Error(passwordChecksDifferent);

        const user = await User.findOne({ email });
        if (user) throw new Error(emailError);

        const salt = await genSalt(12);
        const passwordHash = await hash(password, salt);

        const { _id, todos } = await User.create({ name, email, passwordHash });

        const payload = { _id, name, email, todos };

        const token = sign(payload, process.env.SECRET_JWT, { expiresIn: '1day'});

        res.status(200).json({ payload, token });
    } catch (error) {
        switch (error.message) {
            case passwordRequired:
            case passwordRepeatRequired:
            case passwordChecksDifferent:
                res.status(400).json({ error: error.message });
            case emailError:
                res.status(409).json({ error: error.message });
                break;
            case passwordRequired:
                res.status(409).json({ error: error.message });
                break;
            default:
                res.status(500).json({ error: error.message });
        };
    };
});

router.post("/login", async (req, res) => {
    const incorrectLogin = "Email or Password is invalid!";

    try {
        const { email, password } = await req.body;
        
        const user = await User.findOne({ email }, { name: 1, passwordHash: 1, todos: 1 }).populate("todos");
        if (!user) throw new Error(incorrectLogin);

        const { _id, name, passwordHash, todos } = await user;

        const compareHash = await compare(password, passwordHash);
        if (!compareHash) throw new Error(incorrectLogin);

        const payload = { _id, name, email, todos };

        const token = sign(payload, process.env.SECRET_JWT, { expiresIn: '1day'});

        res.status(200).json({ payload, token });
    } catch (error) {res.status(401).json({ error: error.message })};
});

module.exports = router;