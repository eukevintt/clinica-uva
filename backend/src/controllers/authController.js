const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function generateToken(user) {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );
}

async function register(req, res) {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Nome, email e senha são obrigatórios" });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(409).json({ message: "E-mail já cadastrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "patient"
        });

        return res.status(201).json({
            message: "Usuário cadastrado com sucesso",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token: generateToken(user)
        });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao cadastrar usuário" });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "E-mail e senha são obrigatórios" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }

        return res.status(200).json({
            message: "Login realizado com sucesso",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token: generateToken(user)
        });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao realizar login" });
    }
}

module.exports = {
    register,
    login
};