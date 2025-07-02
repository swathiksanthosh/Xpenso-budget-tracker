const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto"); // 🔸 Required for token generation

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: "" },

    // 🔹 New fields for password reset
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
}, { timestamps: true });

// 🔒 Hash Password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// 🔍 Compare entered password with hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// 🔐 Generate reset token for forgot password
UserSchema.methods.generatePasswordReset = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Store hashed version in DB (secure)
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // Token valid for 1 hour

    return resetToken; // Send plain token to user via email
};

module.exports = mongoose.model("User", UserSchema);