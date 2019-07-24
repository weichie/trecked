const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const app = require('express')();

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://trecked-6b2cd.firebaseio.com"
});


const firebase = require('firebase');
firebase.initializeApp(config);

const db = admin.firestore();

app.get('/places', (req, res) => {
   db
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

   db
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

// Signup route
app.post('/signup', (req, res) => {
   const newUser = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      handle: req.body.handle,
   };

   // TODO: validate data
   let token, userId;
   db.doc(`/users/${newUser.handle}`).get()
      .then(doc => {
         if(doc.exists){
            return res.status(400).json({ handle: 'This handle is already taken' });
         }else{
            return firebase
               .auth()
               .createUserWithEmailAndPassword(newUser.email, newUser.password);
         }
      })
      .then(data => {
         userId = data.user.uid;
         return data.user.getIdToken();
      })
      .then(idToken => {
         token = idToken;
         const userCredentials = {
            handle: newUser.handle,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            userId
         };
         return db
            .doc(`/users/${newUser.handle}`)
            .set(userCredentials);
      })
      .then(() => {
         return res.status(201).json({ token });
      })
      .catch(err => {
         console.error(err);
         if (err.code === 'auth/email-already-in-use'){
            return res.status(400).json({ email: 'Email is already in use' });
         }else{
            return res.status(500).json({ error: err.code });
         }
      });
});


// use /api/ as prefix
exports.api = functions.region('europe-west1').https.onRequest(app);