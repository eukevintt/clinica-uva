# 🏥 Sistema de Atendimento Inteligente para Clínicas Médicas

## 🔗 Links

* 🌐 Frontend: https://clinica-uva.vercel.app/login
* 🔧 Backend: https://clinica-uva-8rxj.vercel.app/health

---

## 📌 Descrição

Este projeto consiste em uma aplicação web completa para gerenciamento de consultas médicas, desenvolvida com foco em **segurança, integração com APIs externas e experiência do usuário moderna**.

A aplicação permite que clínicas de pequeno porte informatizem seu processo de agendamento, oferecendo autenticação segura, automação de dados e um painel administrativo intuitivo.

---

## 🚀 Tecnologias Utilizadas

### 🔹 Frontend

* Vue.js 3
* Vite
* Tailwind CSS
* Pinia
* Axios

### 🔹 Backend

* Node.js
* Express
* MongoDB (MongoDB Atlas)
* Mongoose
* JWT (Autenticação)
* Bcrypt

### 🔹 Integrações

* ViaCEP (consulta de endereço)
* OpenWeatherMap (previsão do tempo)

---

## ⚙️ Funcionalidades

* ✅ Cadastro e login de usuários (paciente e secretário)
* ✅ Autenticação segura com JWT
* ✅ Agendamento de consultas
* ✅ Verificação de horários disponíveis
* ✅ Consulta automática de endereço via CEP
* ✅ Integração com API de clima (alerta de chuva)
* ✅ Painel administrativo com listagem de atendimentos
* ✅ Interface moderna e responsiva

---

## 🧠 Arquitetura do Projeto

```bash
clinica-uva/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── app.js
│   ├── api/
│   │   └── index.js
│   └── vercel.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── index.html
```

---

## 🔐 Autenticação

A autenticação é realizada utilizando **JWT (JSON Web Token)**, garantindo segurança no acesso às rotas protegidas.

* Login retorna token
* Token armazenado no frontend
* Middleware protege rotas privadas

---

## 🌐 APIs Utilizadas

### 📍 ViaCEP

* Utilizada para preenchimento automático de endereço a partir do CEP

### 🌦 OpenWeatherMap

* Utilizada para verificar previsão do tempo no dia da consulta
* Exibe alerta em caso de chuva

---

## 💻 Como Executar o Projeto Localmente

### 🔹 Backend

```bash
cd backend
npm install
npm run dev
```

Crie um arquivo `.env`:

```env
PORT=3000
MONGO_URI=sua_string_mongodb
JWT_SECRET=sua_chave_secreta
OPENWEATHER_API_KEY=sua_api_key
```

---

### 🔹 Frontend

```bash
cd frontend
npm install
npm run dev
```

Crie um `.env`:

```env
VITE_API_URL=http://localhost:3000
```

---

## ☁️ Deploy

### 🔹 Frontend

Deploy realizado na Vercel.

### 🔹 Backend

Deploy realizado na Vercel com Functions.

### 🔹 Banco de Dados

MongoDB Atlas (cloud)

---

## 📚 Planejamento do Projeto

O desenvolvimento seguiu as etapas propostas:

* Definição das funcionalidades principais
* Estruturação do backend com Express
* Implementação de autenticação JWT
* Integração com banco de dados MongoDB
* Integração com APIs externas
* Desenvolvimento do frontend com Vue.js
* Criação de interface moderna e responsiva
* Deploy e documentação

---

## 👨‍💻 Autor

Kevin Araujo

---

## 📄 Considerações Finais

O sistema desenvolvido atende aos requisitos propostos, entregando uma solução funcional, segura e com experiência de usuário refinada, demonstrando a aplicação prática de conceitos de desenvolvimento web moderno.
