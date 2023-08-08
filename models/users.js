const mongoose = require("mongoose");

// Création du schéma pour les utilisateurs
const userSchema = mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  genre: { type: String },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  motdepasse: { type: String, required: true },
  token: { type: String },
  image: { type: String },
  amis: [{ type: String, ref: "User" }],
  vetements: { 
    haut: [{
      marque: { type: String },
      type: { type: String },
      coupe: { type: String },
      taille: { type: String },
      mensurations : {type : Object},
      fit : {type : Boolean},
    }],
    bas: [{
      marque: { type: String },
      type: { type: String },
      coupe: { type: String },
      taille: { type: String },
      mensurations : {type : Object},
      fit : {type : Boolean},
    }],
    chaussures : [{
      marque: { type: String },
      taille: { type: Number },
      mensurations : {type : Object},
      fit : {type : Boolean},
    }],
  },
  vetementsenattente: { 
    haut: [{
      marque: { type: String },
      type: { type: String },
      coupe: { type: String },
      taille: { type: String },
      mensurations : {type : Object},
      fit : {type : Boolean},
    }],
    bas: [{
      marque: { type: String },
      type: { type: String },
      coupe: { type: String },
      taille: { type: String },
      mensurations : {type : Object},
      fit : {type : Boolean},
    }],
    chaussures : [{
      marque: { type: String },
      taille: { type: Number },
      mensurations : {type : Object},
      fit : {type : Boolean},
    }],
  },
  mensurations: {
    haut: {
      tourDePoitrine: { type: Number },
      tourDeTaille: { type: Number },
      tourDeHanches: { type: Number },
    },
    bas: {
      tourDeBassin: { type: Number },
      tourDeTaille: { type: Number },
      longueurJambe: { type: Number },
    },
    chaussures: {
      longueur: { type: Number },
      pointure: { type: Number },
    },
  },
});

// Création du modèle pour les utilisateurs basé sur le schéma
const User = mongoose.model("User", userSchema);

module.exports = User;
