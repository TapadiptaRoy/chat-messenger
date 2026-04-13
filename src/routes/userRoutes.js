const { Router } = require("express")
const router=Router()
const authMiddleware=require("../middleware/auth")
const getMe=require("../controllers/getMe")
router.get("/me", authMiddleware, getMe);

module.exports = router;
