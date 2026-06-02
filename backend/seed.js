const mongoose = require('mongoose');
require('dotenv').config(); // Pour lire process.env.MONGO_URI
// Importation de ton modèle Question
const Question = require('./models/Question');
// Création d'un lot de 10 questions codées en dur
const questionsToInsert = [
    {
        category: "Manga",
        text: "Quel est le nom du démon renard à neuf queues dans Naruto ?",
        options: ["Shukaku", "Kurama", "Matatabi","Gyuki"],
        correctAnswer: "Kurama"
    },
    {   category: "Manga",
        text: "Dans One Piece, comment s'appelle l'épéiste de l'équipage de Chapeau de Paille ?",
        options: ["Sanji", "Usopp", "Zoro"],
        correctAnswer: "Zoro"
    },
    {
        category: "F1",
        text: "Combien de titres mondiaux Lewis Hamilton a-t-il remportés (jusqu'en 2023) ?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "7"
    },
    {
        category: "F1",
        text: "Quelle écurie est surnommée 'Le Cheval Cabré' ?",
        options: ["Mercedes", "Ferrari", "Red Bull","McLaren"],
        correctAnswer: "Ferrari"},
    {
        category: "Informatique",
        text: "Que signifie l'acronyme HTML ?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text  Markup Level"],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        category: "Informatique",
        text: "Lequel de ces langages est exécuté côté client dans un navigateur web ?",
        options: ["PHP", "JavaScript", "Python"],
        correctAnswer: "JavaScript"
    },
    {
        category: "Jeux Vidéo",
        text: "En quelle année est sorti le premier jeu Super Mario Bros ?",options: ["1981", "1985", "1990", "1992"],
        correctAnswer: "1985"
    },
    {
        category: "Jeux Vidéo",
        text: "Quel est le jeu le plus vendu de tous les temps ?",
        options: ["Minecraft", "GTA V", "Tetris"],
        correctAnswer: "Minecraft"
    },
    {
        category: "Géographie",
        text: "Quelle est la capitale du Japon ?",
        options: ["Séoul", "Pékin", "Tokyo", "Osaka"],
        correctAnswer: "Tokyo"
    },
    {
        category: "Géographie",
        text: "Quel est le plus grand océan de la Terre ?", 
        options: ["Océan Atlantique", "Océan Indien","Océan Pacifique"],
        correctAnswer: "Océan Pacifique"
    }
];
// Fonction asynchrone principale pour gérer la base de données
const seedDB = async () => {
    try {
    // 1. Connexion à MongoDB
        await
        mongoose.connect(process.env.MONGO_URI);
        console.log('Connexion à MongoDB réussie pourle Seeding.');
    // 2. Purge de la collection (On efface tout)
        await Question.deleteMany({});
        console.log('Collection Question purgée avec succès.');// 3. Insertion massive des 10 questions
        await Question.insertMany(questionsToInsert);
        console.log('Les 10 questions ont été insérées avec succès !');
    // 4. Fermeture automatique du script avecsuccès (code 0)
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors du seeding :', error);
        // Fermeture avec code d'erreur (code 1)
        process.exit(1);
    }
};
// Exécution de la fonction
seedDB();