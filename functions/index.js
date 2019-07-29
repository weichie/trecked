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
      return db.doc(`/places/${snapshot.data().placeId}`)
         .get()
         .then(doc => {
            if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle){
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
         .catch(err => {
            console.error(err);
         });
   });

exports.createNotificationOnComment = functions
   .region('europe-west1')
   .firestore.document('comments/{id}')
   .onCreate((snapshot) => {
      return db.doc(`/places/${snapshot.data().placeId}`)
         .get()
         .then(doc => {
            if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
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
         .catch(err => {
            console.error(err);
         });
   });

exports.deleteNotificationOnUnlike = functions
   .region('europe-west1')
   .firestore
   .document('likes/{id}')
   .onDelete((snapshot) => {
      return db
         .doc(`/notifications/${snapshot.id}`)
         .delete()
         .catch(err => {
            console.error(err);
         });
   });

exports.onUserImageChange = functions
   .region('europe-west1')
   .firestore.document('/users/{userId}')
   .onUpdate(change => {
      if(change.before.data().imageUrl !== change.after.data().imageUrl){
         const batch = db.batch();
         return db
            .collection('places')
            .where('userHandle', '==', change.before.data().handle)
            .get()
            .then(data => {
               data.forEach(doc => {
                  const place = db.doc(`/places/${doc.id}`)
                  batch.update(place, { userImage: change.after.data().imageUrl });
               })
               return batch.commit();
            });
      }else return true;
   });

// remove related likes / Comments on deleted place
exports.onPlaceDelete = functions
   .region('europe-west1')
   .firestore.document('/places/{placeId}')
   .onDelete((snapshot, context) => {
      const placeId = context.params.placeId;
      const batch = db.batch();
      return db.collection('comments').where('placeId', '==', placeId).get()
         .then(data => {
            data.forEach(doc => {
               batch.delete(db.doc(`/comments/${doc.id}`));
            });
            return db.collection('likes').where('placeId', '==', placeId).get();
         })
         .then(data => {
            data.forEach(doc => {
               batch.delete(db.doc(`/likes/${doc.id}`));
            });
            return db.collection('notifications').where('placeId', '==', placeId).get();
         })
         .then(data => {
            data.forEach(doc => {
               batch.delete(db.doc(`/notifications/${doc.id}`));
            });
            return batch.commit();
         })
         .catch(err => {
            console.error(err);
         });
   });