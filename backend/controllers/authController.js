const User = require('../models/User');
const jwt = require('jsonwebtoken');
exports.login = async (req, res) => {
    try {
        const { pseudo } = req.body;
        // 1. Vérification de la présence du pseudo
        if (!pseudo) {
            return res.status(400).json({ message: 'Le pseudo est requis' });
        }
        // 2. Recherche du joueur dans MongoDB
        let user = await User.findOne({ pseudo:pseudo.trim().toLowerCase() });
// 3. S'il n'existe pas, on le crée automatiquement avec un score de 0
        if (!user) {
            user = new User({ pseudo, bestScore: 0 });
            await user.save();
        }
        // 4. Génération du Token
        const token = jwt.sign(
            { _id: user._id, pseudo: user.pseudo }, // Lesdonnées embarquées (Payload)
            process.env.JWT_SECRET, // La clé secrète du serveur
            { expiresIn: '2h' } // Durée de validité
        );
        // 5. On renvoie le token au Front-End
        res.status(200).json({ token, user });
    } catch (error) {
        console.error("Erreur lors du login :", error);res.status(500).json({ message: 'Erreur serveur'});
    }
};