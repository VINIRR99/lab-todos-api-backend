const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        name: { type: String, required:true, trim: true },
        email: {
            type: String,
            match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        passwordHash: { type: String, required: [true, 'Password is required.'] },
        todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }]
    },
    { timestamps: true }
);

module.exports = model("User", userSchema);