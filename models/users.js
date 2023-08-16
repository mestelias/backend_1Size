const mongoose = require("mongoose");

// Création du schéma pour les utilisateurs
const userSchema = mongoose.Schema({
  nom: { type: String },
  prenom: { type: String },
  genre: { type: String },
  username: { type: String },
  email: { type: String },
  motdepasse: { type: String },
  token: { type: String },
  image: { type: String },
  //clée étrangère
  amis: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  vetements: { 
    haut: [{
      marque: { type: String },
      type: { type: String },
      coupe: { type: String },
      taille: { type: String },
      mensurations : {type : Object},
      // fit pour le pouce en l'air (ou pas) dans "mes vêtements"
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
      type: { type: String},
      mensurations : {type : Object},
      fit : {type : Boolean},
    }],
  },
  //redondance avec vetements, pas idéale mais manque de temps.
  //on aurait pu rajouter une prop à vêtement "en attente" avec un booléen
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
  //mensurations de l'utilisateur
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
const User = mongoose.model("users", userSchema);

module.exports = User;
