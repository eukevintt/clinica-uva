const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'clinica_db'
        })
        console.log("MongoDB conectado com sucesso");
    } catch (error) {
        console.error("Erro ao conectar no MongoDB:", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;