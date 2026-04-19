const router = require("express").Router();
const authMiddleware = require("../Middlewares/authMiddleware");
const {del, edit, add, get}=require("../Controllers/TaskController");

router.post("/add", authMiddleware, add);
router.get("/", authMiddleware, get);
router.put("/:id", authMiddleware, edit);
router.delete("/:id", authMiddleware, del);

module.exports = router;