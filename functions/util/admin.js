const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://trecked-6b2cd.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };