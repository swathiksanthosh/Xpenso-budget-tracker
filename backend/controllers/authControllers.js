const User = require('../model/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const { OAuth2Client } = require('google-auth-library');



//  Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    console.log("BODY RECEIVED: ", req.body);


    // Validation: check for missing fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Create new user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        // Respond with user info and token
       res.status(201).json({
        token: generateToken(user._id),
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
            }
        });


    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

//  Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Find user
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Send user details + token
        res.status(200).json({
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });

    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
};

//  Get User Info 
exports.getUserInfo = async (req, res) => {
    try {
     const user = await User.findById(req.user.id).select("-password");

     if( !user) {
        return res.status(404).json({ message: "User not found"});
     }

     res.status(200).json(user);
    } catch (err) {
         res.status(500).json({ message: "Get user info Failed", error: err.message });
    }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = user.generatePasswordReset(); // method from user model
    await user.save();

    const resetUrl = `https://your-frontend.com/reset-password/${resetToken}`;

    
await sendEmail(
    user.email,
    "Reset Your Password",
    `Click the following link to reset your password:\n\n${resetUrl}\n\nIf you didn’t request this, you can ignore this email.`
  );
    res.status(200).json({ message: "Password reset link sent to your email", resetUrl });
};

// Reset Password
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully." });
};

// Google Login
exports.googleLogin = async (req, res) => {
  const { OAuth2Client } = require('google-auth-library');
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        fullName: name,
        email,
        password: sub, // Not used for Google login, just to satisfy schema
        profileImageUrl: picture,
      });
    }

    const jwtToken = generateToken(user._id);

    res.status(200).json({
      token: jwtToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
      }
    });
  } catch (err) {
    res.status(401).json({ message: "Google login failed", error: err.message });
  }
};

