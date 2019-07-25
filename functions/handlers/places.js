const { db } = require('../util/admin');

exports.getAllPlaces = (req, res) => {
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
};

// Fetch one place
exports.getPlace = (req, res) => {
   let placeData = {};
   db
      .doc(`/places/${req.params.placeId}`)
      .get()
      .then(doc => {
         if(!doc.exists){
            return res.status(404).json({ error: 'Place not found '});
         }
         placeData = doc.data();
         placeData.placeId = doc.id;
         return db
                  .collection('comments')
                  .orderBy('createdAt', 'desc')
                  .where('placeId', '==', req.params.placeId)
                  .get();
      })
      .then(data => {
         placeData.comments = [];
         data.forEach(doc => {
            placeData.comments.push(doc.data());
         });
         return res.json(placeData);
      })
      .catch(err => {
         console.error(err);
         return res.status(500).json({ error: err.code });
      });
};

// Post a new place
exports.postOnePlace = (req, res) => {
   const newLocation = {
      body: req.body.body,
      userHandle: req.user.handle,
      createdAt: new Date().toISOString()
   };

   db
      .collection('places')
      .add(newLocation)
      .then(doc => {
         res.json({ message: `document ${doc.id} created successfully` });
      })
      .catch(err => {
         res.status(500).json({ error: 'Something went wrong' });
         console.error(err);
      });
};

// Post comment on a place
exports.commentOnPlace = (req, res) => {
   if(req.body.body.trim() === '') return res.status(400).json({ error: 'Must not be empty'});

   const newComment = {
      body: req.body.body,
      createdAt: new Date().toISOString(),
      placeId: req.params.placeId,
      userHandle: req.user.handle,
      userImage: req.user.imageUrl
   };

   db
      .doc(`/places/${req.params.placeId}`)
      .get()
      .then(doc => {
         if(!doc.exists) {
            return res.status(404).json({ error: 'Place not found'});
         }

         return db
                  .collection('comments')
                  .add(newComment);
      })
      .then(() => {
         res.json(newComment);
      })
      .catch(err => {
         console.error(err);
         return res.status(500).json({ error: 'Something went wrong' });
      });
};