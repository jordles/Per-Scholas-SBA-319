
# SBA 319 - Mongoose / MongoDB Database Application (Root)

This Database uses the following collections: Users, Logins, and Posts.  
The Mongoose Schemas utilize reference between collections to create relational databases. 

## Relational Database on Mongoose

I wasn't sure how to make mockaroo incorporate relational database. I saved a list of ObjectIds' and hard coded them into a custom list to have the same objectId when i generate the rest of the data from mockaroo. 



I also pass the same objectid from posts collection back into my users collection, I utilized some commands on the mongodb shell to create a posts array and push the relevant posts' ObjectIds. So any future posts that have a corresponding user ObjectId, it will push its own ObjectId to users to keep it relational. 

```
db.posts.find().forEach(function(post) {
  // Find the user document with userId that matches post.userId
  db.users.updateOne(
    { _id: post.userId },            // Match the user by their _id (which is post.userId)
    { $push: { posts: post._id } }    // Push the post _id into the user's posts array
  );
});
db.posts.find().forEach(function(post) {
  // Find the user document with userId that matches post.userId
  db.users.updateOne(
    { _id: post.user},            // Match the user by their _id (which is post.userId)
    { $push: { posts: post._id } }    // Push the post _id into the user's posts array
  );
});
```

## Attributions

[Mockaroo](https://www.mockaroo.com/)
[One To Many Relations](https://medium.com/@brandon.lau86/one-to-many-relationships-with-mongodb-and-mongoose-in-node-express-d5c9d23d93c2)
[Creating Relationships with Mongoose](https://medium.com/@jaydip.vala/how-to-create-relationships-with-mongoose-4307bd4ea9a5#:~:text=Mongoose%20Relationships,the%20user%20who%20created%20it.&text=Next%2C%20a%20virtual%20property%20needs%20to%20be%20added%20onto%20the%20user.)