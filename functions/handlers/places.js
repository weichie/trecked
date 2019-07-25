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
}