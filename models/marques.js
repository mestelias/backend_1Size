const mongoose = require("mongoose");

// Création du schéma pour les utilisateurs
const marqueSchema = mongoose.Schema({
  name: { type: String},
  url: { type: String},
  homme: { 
    //type:Object car les vêtements et les tailles sont différents pour chaque marque, non prévisible à l'avance
    haut: {type:Object},
    bas: {type:Object},
    chaussures:{type:Object},
  },
  femme: {
    haut: {type:Object},
    bas: {type:Object},
    chaussures:{type:Object},
  }  
})


// Création du modèle pour les marques basé sur le schéma
const Marque = mongoose.model("marques", marqueSchema);

module.exports = Marque;