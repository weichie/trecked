const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://trecked-6b2cd.firebaseio.com"
});

const express = require('express');
const app = express();

app.get('/places', (req, res) => {
   admin
      .firestore()
      .collection('places')
      .orderBy('createdAt', 'desc')
      .get()
      .then(data => {
         let locations = [];
         data.forEach(doc => {
            locations.push({
               locationId: doc.id,
               ...doc.data()
            });
         });
         return res.json(locations);
      })
      .catch(err => console.error(err));
})

app.post('/place', (req, res) => {
   const newLocation = {
      body: req.body.body,
      userHandle: req.body.userHandle,
      createdAt: new Date().toISOString()
   };

   admin
      .firestore()
      .collection('places')
      .add(newLocation)
      .then(doc => {
         res.json({message: `document ${doc.id} created successfully`});
      })
      .catch(err => {
         res.status(500).json({error: 'Something went wrong'});
         console.error(err);
      });
});


// use /api/ as prefix
exports.api = functions.region('europe-west1').https.onRequest(app);