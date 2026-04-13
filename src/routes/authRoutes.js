const { Router } = require("express")
const router=Router();

const {registerUser,loginUser} = require("../controllers/authController");
const {createOrAccessChat, getUserChats} = require("../controllers/chatController");
router.post("/register",(req, res, next) => {
  next();
}, registerUser);
router.post("/login", loginUser);

module.exports = router;