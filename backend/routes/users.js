const router = require("express").Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUserProfile,
  updateUserAvatar,
} = require("../controllers/users");

const {
  validateUpdateProfile,
  validateUpdateAvatar,
} = require("../middlewares/validator");

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.get("/me", getCurrentUser);

router.patch("/me", validateUpdateProfile, updateUserProfile);
router.patch("/me/avatar", validateUpdateAvatar, updateUserAvatar);

module.exports = router;
