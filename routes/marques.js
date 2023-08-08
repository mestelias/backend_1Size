var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');


const db = mongoose.connection;
const Marques = db.collection('Marques')


//Dans toutes les routes, possibilité de rendre homme/femme ou la categorie haut/bas/chaussure dynamique

//récupère le nom de toutes les marques en bdd
router.get('/names', async (req, res) => {
    const {categorie, sexe} = req.query // Recevoir la catégorie comme un paramètre de requète 
    const marques = await Marques.distinct('name', { [`${sexe}.${categorie}`] : {$exists: true}})
    res.json(marques);
  });

//récupère les différents types d'une marque 
router.get('/types', async (req, res) => {
    const { marque, sexe, categorie } = req.query;
    const document = await Marques.findOne({ name:marque });
    const types = Object.keys(document[sexe][categorie]); 
    res.json(types);
});

//récupère les différentes tailles d'un type d'une marque 
router.get('/tailles', async (req, res) => {
    const { marque, type, sexe, categorie } = req.query;
    const document = await Marques.findOne({ name: marque });
    const tailles = Object.keys(document[sexe][categorie][type]);
    res.json(tailles);
});

//récupère les différentes tailles d'un type d'une marque avec leurs mensurations et selon le sexe
router.get('/tailleswithmensurations', async (req, res) => {
    const { marque, type, sexe, categorie } = req.query;
    const document = await Marques.findOne({ name: marque });
    const tailles = document[sexe][categorie][type];
    res.json(tailles);
});

//récupère le tableau de taille correspondant au combo marque/categorie/type/taille
router.get('/tableau', async (req, res) => {
    const { marque, categorie, type, taille, sexe } = req.query;
    const document = await Marques.findOne({ name : marque })
    const tableauTaille = document[sexe][categorie][type][taille]
    res.json(tableauTaille)
})


module.exports = router;