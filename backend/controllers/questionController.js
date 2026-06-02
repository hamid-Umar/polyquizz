const Question = require('../models/Question');
exports.getAllQuestions = async (req, res) => {
    try {
        // Récupère toutes les questions de la base dedonnées
        const questions = await Question.find();
        // Petite astuce d'ingénierie : On mélange le tableau de questions aléatoirement
        const shuffledQuestions = questions.sort(() =>0.5 - Math.random());
        res.status(200).json(shuffledQuestions);
    } catch (error) {
        console.error("Erreur récupération questions :",error);
        res.status(500).json({ message: 'Erreur lors de larécupération des questions' });
    }
};

