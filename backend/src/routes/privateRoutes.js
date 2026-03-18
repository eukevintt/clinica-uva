const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
    return res.status(200).json({
        message: "Rota protegida acessada com sucesso",
        user: req.user
    });
});

module.exports = router;