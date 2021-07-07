const router = require("express").Router();
const { createUser, getInfo, getUserById, updateUser, deleteUser, getUserByEmail, login } = require("./user.controller");

router.post("/", createUser);
router.get("/", getInfo);
router.get("/:id", getUserById);
router.post("/login", login);
router.patch("/", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;