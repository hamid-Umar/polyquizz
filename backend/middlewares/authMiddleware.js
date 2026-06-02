const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        // 1. Récupération du header Authorization
        const authHeader = req.headers.authorization;
        // 2. Vérification du format (il doit commencer par "Bearer ")
        if (!authHeader || !authHeader.startsWith('Bearer')) 
        {
        return res.status(401).json({ message: 'Accèsrefusé. Token manquant ou mal formaté.' });
        }
        // 3. Extraction du token (on enlève le mot "Bearer ")
        const token = authHeader.split(' ')[1];// 4. Décodage et vérification du token avec notre clé secrète
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        // 5. Ajout des infos du joueur décodé à l'objet "req" pour la suite
        req.user = decoded;
        // 6. Tout est bon, on laisse passer vers le contrôleur suivant !
        next();
    } catch (error) {
        // Si le token est faux ou expiré, jwt.verify déclenche une erreur interceptée ici
        return res.status(401).json({ message: 'Token invalide ou expiré.' });
    }
};