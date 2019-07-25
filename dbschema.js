const db = {
   places: [
      {
         userHandle: 'user',
         body: 'This is the place body content',
         createdAt: '2019-07-23T05:37:12.881Z',
         likeCount: 5,
         commentCount: 2
      }
   ],
   users: [
      {
         userId: 'IdBXPHP4QQWRXksy3duGsKbsAH54',
         email: 'user@email.com',
         handle: 'user',
         createdAt: '2019-07-25T19:14:23.701Z',
         imageUrl: 'image/jsdfsf/sdfsd',
         bio: 'Hello, my name is user, nice to meet you!',
         website: 'https://weichieprojects.com',
         location: 'Brussels, BE'
      }
   ]
};

const userDetails = {
   //Vuex Data
   credentials: {
      userId: 'IdBXPHP4QQWRXksy3duGsKbsAH54',
      email: 'user@email.com',
      handle: 'user',
      createdAt: '2019-07-25T19:14:23.701Z',
      imageUrl: 'image/jsdfsf/sdfsd',
      bio: 'Hello, my name is user, nice to meet you!',
      website: 'https://weichieprojects.com',
      location: 'Brussels, BE'
   },
   likes: [
      {
         userHandle: 'user',
         placeId: 'hh7sdfllid98§fYyteaa'
      },
      {
         userHandle: 'user',
         placeId: '3I0nfhUito9'
      }
   ]
};