const User = require('../models/User');
// 1. Mise à jour du score (Protégée par Token)
exports.updateScore = async (req, res) => {
    try {
        const { score } = req.body;
        const userId = req.user._id; // Récupéré automatiquement grâce au middleware d'authentification
        if (score === undefined || typeof score !=='number') {
            return res.status(400).json({ message: 'Le scoreest obligatoire et doit être un nombre.' });
        }
        // Recherche de l'utilisateur
        const user = await User.findById(userId);
        if (!user) {return res.status(404).json({ message:'Utilisateur non trouvé.' });}
        // Contrainte : On ne met à jour que si c'est un nouveau record personnel
        if (score > user.bestScore) {
            user.bestScore = score;
            await user.save();
            return res.status(200).json({ message: 'Nouveau record enregistré !', bestScore: user.bestScore });
        }
        res.status(200).json({ message: 'Score reçu (pas de nouveau record).', bestScore: user.bestScore});
    } catch (error) {
        console.error("Erreur mise à jour score :", error);
        res.status(500).json({ message: 'Erreur serveur.'});
    }
};
// 2. Récupération du classement général
exports.getLeaderboard = async (req, res) => {
    try {
        // On trie par bestScore décroissant (-1) et on limite aux 10 premiers.select('pseudo bestScore') garantit qu'on ne renvoie pas de données sensibles cachées
        const leaderboard = await User.find()
        .sort({ bestScore: -1 })
        .limit(10)
        .select('pseudo bestScore');
        res.status(200).json(leaderboard);
    } catch (error) {
        console.error("Erreur leaderboard :", error);res.status(500).json({ message: 'Erreur lors de la récupération du classement.' });
    }
};