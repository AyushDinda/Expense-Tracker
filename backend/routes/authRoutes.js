// const express = require("express");
// const cloudinary = require("../config/cloudinary");
// const { protect } = require("../middleware/authMiddleware");

// const { registerUser, loginUser, getUserInfo } = require("../controllers/authController");
// const upload = require("../middleware/uploadMiddleware");

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/getUser", protect, getUserInfo);

// router.post("/upload-image", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: "profile_pics",
//     });

//     res.status(200).json({
//       imageUrl: result.secure_url,
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Upload failed" });
//   }
// });

// const { updateProfileImage } = require("../controllers/authController");

// router.put("/update-profile-image", protect, updateProfileImage);

// module.exports = router;



const express = require("express");
const cloudinary = require("../config/cloudinary");
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getUserInfo,
  updateProfileImage, // 👈 make sure you have this controller
} = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

// 🔥 UPDATE PROFILE IMAGE (URL only)
router.put("/update-profile-image", protect, updateProfileImage);

// 🔥 UPLOAD IMAGE → CLOUDINARY (OPTIMIZED)
router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_pics",
      transformation: [
        { width: 300, height: 300, crop: "fill" },
        { quality: "auto" },
        { fetch_format: "auto" },
      ],
    });

    res.status(200).json({
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;