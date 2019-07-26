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
      userImage: req.user.imageUrl,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      commentCount: 0
   };

   db
      .collection('places')
      .add(newLocation)
      .then(doc => {
         const resPlace = newLocation;
         resPlace.placeId = doc.id;
         res.json(resPlace);
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

         return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
      })
      .then(() => {
         return db.collection('comments').add(newComment);
      })
      .then(() => {
         return res.json(newComment);
      })
      .catch(err => {
         console.error(err);
         return res.status(500).json({ error: 'Something went wrong' });
      });
};

// Like a place
exports.likePlace = (req, res) => {
   const likeDocument = db
                           .collection('likes')
                           .where('userHandle', '==', req.user.handle)
                           .where('placeId', '==', req.params.placeId)
                           .limit(1);
   
   const placeDocument = db.doc(`/places/${req.params.placeId}`);

   let placeData = {};
   placeDocument
      .get()
      .then(doc => {
         if(doc.exists){
            placeData = doc.data();
            placeData.placeId = doc.id;
            return likeDocument.get();
         }else{
            return res.status(404).json({error: 'Place not found'});
         }
      })
      .then(data => {
         if(data.empty){
            return db.collection('likes').add({
               placeId: req.params.placeId,
               userHandle: req.user.handle,
               createdAt: new Date().toISOString()
            })
            .then(() => {
               placeData.likeCount++;
               return placeDocument.update({likeCount: placeData.likeCount});
            })
            .then(() => {
               return res.json(placeData);
            });
         }else{
            return res.status(400).json({error: 'Place already liked'});
         }
      })
      .catch(err => {
         console.error(err);
         return res.status(500).json({error: err.code});
      });
};

// Unlike a place
exports.unlikePlace = (req, res) => {
   const likeDocument = db
      .collection('likes')
      .where('userHandle', '==', req.user.handle)
      .where('placeId', '==', req.params.placeId)
      .limit(1);

   const placeDocument = db.doc(`/places/${req.params.placeId}`);

   let placeData = {};
   placeDocument
      .get()
      .then(doc => {
         if (doc.exists) {
            placeData = doc.data();
            placeData.placeId = doc.id;
            return likeDocument.get();
         } else {
            return res.status(404).json({ error: 'Place not found' });
         }
      })
      .then(data => {
         if (data.empty) {
            return res.status(400).json({ error: 'Place not liked' });
         } else {
            return db
                     .doc(`/likes/${data.docs[0].id}`)
                     .delete()
                     .then(() => {
                        placeData.likeCount--;
                        return placeDocument.update({ likeCount: placeData.likeCount });
                     })
                     .then(() => {
                        return res.json(placeData);
                     })
         }
      })
      .catch(err => {
         console.error(err);
         return res.status(500).json({ error: err.code });
      }); 
}

// Delete a place
exports.deletePlace = (req, res) => {
   const document = db.doc(`/places/${req.params.placeId}`);
   document
      .get()
      .then(doc => {
         if(!doc.exists){
            return res.status(404).json({error: 'Place not found'});
         }
         if(doc.data().userHandle !== req.user.handle){
            return res.status(403).json({ error: 'Unauthorized' });
         }else{
            return document.delete();
         }
      })
      .then(() => {
         res.json({ message: 'Place deleted successfully'});
      })
      .catch(err => {
         console.error(err);
         return res.status(500).json({ error: err.code });
      });
}