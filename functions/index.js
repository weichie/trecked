const functions = require('firebase-functions');
const app = require('express')();
const { db } = require('./util/admin');

const FBAuth = require('./util/FBAuth');

const { 
   getAllPlaces, 
   postOnePlace, 
   getPlace, 
   commentOnPlace, 
   likePlace, 
   unlikePlace, 
   deletePlace 
} = require('./handlers/places');
const { 
   signup, 
   login, 
   uploadImage, 
   addUserDetails, 
   getAuthenticatedUser, 
   getUserDetails, 
   markNotificationsRead 
} = require('./handlers/users');

// == ROUTES ==========
// -- places -----
app.get('/places', getAllPlaces);
app.get('/place/:placeId', getPlace);
app.get('/place/:placeId/like', FBAuth, likePlace);
app.get('/place/:placeId/unlike', FBAuth, unlikePlace);
app.post('/place', FBAuth, postOnePlace);
app.post('/place/:placeId/comment', FBAuth, commentOnPlace);
app.delete('/place/:placeId', FBAuth, deletePlace);

// -- users -----
app.get('/user', FBAuth, getAuthenticatedUser);
app.get('/user/:handle', getUserDetails);
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.post('/notifications', FBAuth, markNotificationsRead);

// use /api/ as prefix
exports.api = functions.region('europe-west1').https.onRequest(app);

// == NOTIFICATIONS ==========
exports.createNotificationOnLike = functions
   .region('europe-west1')
   .firestore.document('likes/{id}')
   .onCreate((snapshot) => {
      db.doc(`/places/${snapshot.data().placeId}`)
         .get()
         .then(doc => {
            if(doc.exists){
               return db
                        .doc(`/notifications/${snapshot.id}`)
                        .set({
                           createdAt: new Date().toISOString(),
                           recipient: doc.data().userHandle,
                           sender: snapshot.data().userHandle,
                           type: 'like',
                           read: false,
                           placeId: doc.id
                        });
            }
         })
         .then(() => {
            return;
         })
         .catch(err => {
            console.error(err);
            return;
         });
   });

exports.createNotificationOnComment = functions
   .region('europe-west1')
   .firestore.document('comments/{id}')
   .onCreate((snapshot) => {
      db.doc(`/places/${snapshot.data().placeId}`)
         .get()
         .then(doc => {
            if (doc.exists) {
               return db
                  .doc(`/notifications/${snapshot.id}`)
                  .set({
                     createdAt: new Date().toISOString(),
                     recipient: doc.data().userHandle,
                     sender: snapshot.data().userHandle,
                     type: 'comment',
                     read: false,
                     placeId: doc.id
                  });
            }
         })
         .then(() => {
            return;
         })
         .catch(err => {
            console.error(err);
            return;
         });
   });

exports.deleteNotificationOnUnlike = functions
   .region('europe-west1')
   .firestore
   .document('likes/{id}')
   .onDelete((snapshot) => {
      db
         .doc(`/notifications/${snapshot.id}`)
         .delete()
         .then(() => {
            return;
         })
         .catch(err => {
            console.error(err);
            return;
         });
   });
