
const { Router } = require("express")
const router=Router()
const authMiddleware = require("../middleware/auth");

const {createOrAccessChat,getUserChats} = require("../controllers/chatController");
router.post("/",(req, res, next) => {

  next();
}, authMiddleware, createOrAccessChat);

router.get("/", authMiddleware, getUserChats);
router.get("/", authMiddleware, (req, res) => {
  res.send("Middleware passed");
});
module.exports = router;

