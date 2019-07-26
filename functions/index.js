const functions = require('firebase-functions');
const app = require('express')();

const FBAuth = require('./util/FBAuth');

const { getAllPlaces, postOnePlace, getPlace, commentOnPlace, likePlace, unlikePlace, deletePlace } = require('./handlers/places');
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser } = require('./handlers/users');

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
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);

// use /api/ as prefix
exports.api = functions.region('europe-west1').https.onRequest(app);