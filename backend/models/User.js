const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
pseudo: {
    type: String,
    required: [true, 'Le pseudonyme est obligatoire'], 
    unique: true, 
    trim: true, // Enlève les espaces au début et à la fin
    lowercase: true, // Convertit automatiquement en minusculesspan_21
    match: [/^\S+$/, 'Le pseudonyme ne doit contenir aucun espace'] // Bloque lesespaces internesspan_22
},
    bestScore: {
        type: Number,
        default: 0 // Par défaut à 0span_23
    }}, { timestamps: true }); // Optionnel : ajoute des dates de création/modification automatiquement
module.exports = mongoose.model('User',userSchema);