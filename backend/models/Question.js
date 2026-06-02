const mongoose = require('mongoose');
const questionSchema = new
mongoose.Schema({
    category: {
        type: String,
        required: [true, 'La catégorie est obligatoire']
    },
    text: {
        type: String,
        required: [true, 'Le texte de la question est obligatoire']
    },
    options: {
        type: [String],
        required: [true, 'Les options de réponse sont obligatoires'],
        validate: {
            validator: function(val) {return val.length >= 2 && val.length <= 4; //Contrainte d'ingénierie (2 à 4 éléments)
            },
            message: 'Une question doit proposer entre 2 et 4 options de réponse.'
        }
    },
    correctAnswer: {
        type: String,
        required: [true, 'La bonne réponse est obligatoire']
    }
});
module.exports = mongoose.model('Question',questionSchema);