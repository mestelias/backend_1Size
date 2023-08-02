var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

const uniqid = require('uniqid');

router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['nom', 'prenom','genre','username', 'email', 'motdepasse'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // Check if the user has not already been registered
  User.findOne({ email: req.body.email }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.motdepasse, 10);

      const newUser = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        genre: req.body.genre,
        email: req.body.email,
        username: req.body.username,
        motdepasse: hash,
        token: uid2(32),
      });

      newUser.save().then(newDoc => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: "L'adresse e-mail existe déjà" });
    }
  });
});

router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['email', 'motdepasse'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ email: req.body.email }).then(data => {

   if (data && bcrypt.compareSync(req.body.motdepasse, data.motdepasse)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});

router.get('/userdata:token', (req, res) => 
User.findOne({ token: req.params.token }).then(data => {
  if (data) {
    res.json({ nom: data.nom, prenom: data.prenom, genre: data.genre, username: data.username, email: data.email });
  } else {
    res.json({ result: false, error: 'User not found' });
  }
})
);



router.post('/upload', async (req, res) => {
  const photoPath = `tmp/${uniqid()}.jpg`
  console.log(req.files);
  const resultMove = await req.files.profilePic.mv(photoPath)
  if (!resultMove) {
    const resultCloudinary = await cloudinary.uploader.upload(photoPath);
    fs.unlinkSync(photoPath);
    res.json({ result: true, url: resultCloudinary.secure_url });
  } else {
    res.json({result:false, error:resultMove})
  }
 });

router.post('/update', async (req, res) => {  
    User.findOneAndUpdate(
      { token: req.body.token },
      { $set: { image: req.body.image } },
      { new : true }
    )
    .then(updatedDoc => {
      if(updatedDoc) {
        res.json({ result: true, user: updatedDoc });
      } else {
        res.json({ result: false, error: 'User not found' });
      }
    })
})

router.post("/mensurations", async (req, res) => {
  try {
    // Récupérer les données du corps de la requête
    const { username, tourDePoitrine, tourDeTaille, tourDeHanches } = req.body;

    // Vérifier si l'utilisateur existe dans la base de données
    const existingUser = await User.findOne({ username });
    console.log(existingUser.username)
    if (!existingUser.username) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }
    
    // Mettre à jour les mensurations du haut pour l'utilisateur
    existingUser.mensurations.haut.tourDePoitrine = tourDePoitrine;
    existingUser.mensurations.haut.tourDeTaille = tourDeTaille;
    existingUser.mensurations.haut.tourDeHanches = tourDeHanches;
    

    // Enregistrer les modifications dans la base de données
    await existingUser.save();
    console.log(existingUser.mensurations.haut.tourDePoitrine)
    res.status(200).json({ message: "Mensurations mises à jour avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour des mensurations" });
  }
});

module.exports = router;
