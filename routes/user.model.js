const { Router } = require('express');

const User = require("../models/User.model");

const router = Router();

const { genSalt, hash, compare } = require("bcryptjs");

router.put("/", async (req, res) => {
    const noInput = "No input!";
    const currentPasswordRequired = "Current Password is required!";
    const newPasswordRequired = "New Password is required!";
    const reapetedPasswordRequired = "Reapeted password is required!";
    const passwordsAreDifferent = "Password checks are diferent!";
    const currentPasswordInvalid = "Current password is invalid!"

    try {
        const { name, email, currentPassword, newPassword1, newPassword2 } = await req.body;
        const { _id } = await req.user;

        const updatedData = {};

        if (name.length > 0) updatedData.name = name;
        if (email.length > 0) updatedData.email = email;

        if ((currentPassword.length === 0) && ((newPassword1.length > 0) || (newPassword2.length > 0))) {
            throw new Error(currentPasswordRequired);
        };

        if ((currentPassword.length > 0) && (newPassword1.length === 0)) throw new Error(newPasswordRequired);
        if ((currentPassword.length > 0) && (newPassword1.length > 0) && (newPassword2.length === 0)) {
            throw new Error(reapetedPasswordRequired);
        };

        if ((currentPassword.length > 0) && (newPassword1.length > 0) && (newPassword2.length > 0)) {
            if (newPassword1 !== newPassword2) throw new Error(passwordsAreDifferent);
            
            const { passwordHash } = await User.findById(_id, { _id: 0, passwordHash: 1 });
            const compareHash = await compare(currentPassword, passwordHash);
            if (!compareHash) throw new Error(currentPasswordInvalid);

            const salt = await genSalt(12);
            updatedData.passwordHash = await hash(newPassword1, salt);
        };

        if (Object.keys(updatedData).length === 0) throw new Error(noInput);

        const updatedUser = await User.findByIdAndUpdate(_id, updatedData, { new: true })
            .select("-passwordHash -createdAt -updatedAt -__v").populate("todos");

        res.status(200).json(updatedUser);
    } catch (error) {
        switch (error.message) {
            case noInput:
            case currentPasswordRequired:
            case newPasswordRequired:
            case reapetedPasswordRequired:
            case passwordsAreDifferent:
                res.status(400).json({ error: error.message });
                break;
            case currentPasswordInvalid:
                res.status(401).json({ error: error.message });
                break;
            default:
                res.status(500).json({ error: error.message });
        };
    };
});

module.exports = router;