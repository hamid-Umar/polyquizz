const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(cors())
app.use(express.json());
// --- AJOUT ET IMPORTATION DES ROUTES ---
const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const userRoutes = require('./routes/userRoutes');
// --- BRANCHEMENT DES ENDPOINTS API ---
app.use('/api/auth', authRoutes); // Gère le login et la distribution de token
app.use('/api/questions', questionRoutes); //Gère la distribution des questions
app.use('/api/users', userRoutes); // Gère les scores et le classement général
// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('· Connexion réussie àMongoDB !'))
.catch((err) => console.error(' ErreurMongoDB :', err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});