const axios = require("axios");
const Appointment = require("../models/Appointment");

async function createAppointment(req, res) {
    try {
        const { date, time, cep, weatherAlert } = req.body || {};

        if (!date || !time || !cep) {
            return res.status(400).json({ message: "Data, horário e CEP são obrigatórios" });
        }

        const normalizedCep = cep.replace(/\D/g, "");

        if (normalizedCep.length !== 8) {
            return res.status(400).json({ message: "CEP inválido" });
        }

        const appointmentExists = await Appointment.findOne({ date, time });

        if (appointmentExists) {
            return res.status(409).json({ message: "Já existe uma consulta agendada para esse horário" });
        }

        const viaCepResponse = await axios.get(`https://viacep.com.br/ws/${normalizedCep}/json/`);

        if (viaCepResponse.data.erro) {
            return res.status(400).json({ message: "CEP não encontrado" });
        }

        const appointment = await Appointment.create({
            patient: req.user.id,
            date,
            time,
            cep: normalizedCep,
            street: viaCepResponse.data.logradouro || "",
            neighborhood: viaCepResponse.data.bairro || "",
            city: viaCepResponse.data.localidade || "",
            state: viaCepResponse.data.uf || "",
            weatherAlert: weatherAlert || ""
        });

        return res.status(201).json({
            message: "Consulta agendada com sucesso",
            appointment
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao criar agendamento" });
    }
}

async function listAppointments(req, res) {
    try {
        let appointments;

        if (req.user.role === "secretary") {
            appointments = await Appointment.find().populate("patient", "name email role").sort({ date: 1, time: 1 });
        } else {
            appointments = await Appointment.find({ patient: req.user.id }).populate("patient", "name email role").sort({ date: 1, time: 1 });
        }

        return res.status(200).json({
            appointments
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao listar agendamentos" });
    }
}

module.exports = {
    createAppointment,
    listAppointments
};