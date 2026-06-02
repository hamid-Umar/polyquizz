const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware'); // Importation du vigile
// Route protégée : Seul un joueur connecté peut soumettre un score
router.post('/score', authMiddleware,userController.updateScore);
// Route publique : Tout le monde peut voir le classement
router.get('/leaderboard',userController.getLeaderboard);
module.exports = router;