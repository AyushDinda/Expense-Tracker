const User = require("../models/User");
const jwt = require("jsonwebtoken");

// 🔐 Generate Token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "14d" } // longer session
  );
};

// ================= REGISTER =================
exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password, profileImageUrl } = req.body;

    // ✅ Validation
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    // ✅ Create user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl: profileImageUrl || null, // 🔥 FIX (no empty string)
    });

    // ✅ Remove password
    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({
      success: true,
      id: user._id,
      user: userObj,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};

// ================= LOGIN =================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Find user
    const user = await User.findOne({ email });

    // ❌ Invalid credentials
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ✅ Remove password
    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({
      success: true,
      id: user._id,
      user: userObj,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error logging in user",
      error: error.message,
    });
  }
};

// ================= GET USER =================
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      id: user._id,
      user,
    });

  } catch (error) {
    console.error("GET USER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching user info",
      error: error.message,
    });
  }
};

// ================= UPDATE PROFILE IMAGE =================
exports.updateProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { profileImageUrl } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { profileImageUrl: profileImageUrl || null }, // 🔥 FIX
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("UPDATE IMAGE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update profile image",
      error: error.message,
    });
  }
};