const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://trecked-6b2cd.firebaseio.com"
});

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("SUPPPP!");
});

exports.getLocations = functions.https.onRequest((req, res) => {
   admin
      .firestore()
      .collection('places')
      .get()
      .then(data => {
         let locations = [];
         data.forEach(doc => {
            locations.push(doc.data());
         });
         return res.json(locations);
      })
      .catch(err => console.error(err));
});

exports.createLocation = functions.https.onRequest((req, res) => {
   if(req.method !== 'POST'){
      return res.status(400).json({error: 'Method not allowed'});
   }
   
   const newLocation = {
      body: req.body.body,
      userHandle: req.body.userHandle,
      createdAt: admin.firestore.Timestamp.fromDate(new Date())
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