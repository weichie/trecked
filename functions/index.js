const functions = require('firebase-functions');
const app = require('express')();

const FBAuth = require('./util/FBAuth');

const { getAllPlaces, postOnePlace } = require('./handlers/places');
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser } = require('./handlers/users');

// == ROUTES ==========
// -- places -----
app.get('/places', getAllPlaces);
app.post('/place', FBAuth, postOnePlace);

// -- users -----
app.get('/user', FBAuth, getAuthenticatedUser);

app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);

// use /api/ as prefix
exports.api = functions.region('europe-west1').https.onRequest(app);