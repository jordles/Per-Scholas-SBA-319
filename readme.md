
# SBA 319 - Mongoose / MongoDB Database Application (Root)

This Database uses the following collections: Users, Logins, and Posts.  
The Mongoose Schemas utilize reference between collections to create relational databases. 

## Requirements

| Requirement | Weight | Finished |
| :-- | :--: | :--: |
| Use at least three different data collections within the database (such as users, posts, or comments). | 5% |  |
| Utilize reasonable data modeling practices. | 10% |  |
| Create GET routes for all data that should be exposed to the client, using appropriate query commands to retrieve the data from the database. | 10% |  |
| Create POST routes for data, as appropriate, using appropriate insertion commands to add data to the database. At least one data collection should allow for client creation via a POST request. | 10% |  |
| Create PATCH or PUT routes for data, as appropriate, using appropriate update commands to change data in the database. At least one data collection should allow for client manipulation via a PATCH or PUT request. | 10% |  |
| Create DELETE routes for data, as appropriate, using appropriate delete commands to remove data from the database. At least one data collection should allow for client deletion via a DELETE request. | 10% |  |
| Include sensible indexes for any and all fields that are queried frequently. For fields that may have a high write-to-read ratio, you may forgo indexes for performance considerations. Make comments of this where applicable. | 5% |  |
| Include sensible MongoDB data validation rules for at least one data collection. <br><br> Note: this may be accomplished in a number of ways. If you choose to perform this task outside of your application's code, you must include a way to test the validation within the application's routes. This can be as simple as providing a POST route that attempts to create an invalid document and displays the resulting error. | 5% |  |
| Populate your application's collections with sample data illustrating the use case of the collections. You must include at least five sample documents per collection. <br><br> Note: Double-check this requirement before submission. Testing your delete routes may leave you under the requirement. To be safe, populate your collections with sample data well above the requirement (we recommend 10-20 documents). | 5% |  |
| Utilize reasonable code organization practices. | 5% |  |
| Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit). | 10% |  |
| Commit frequently to the git repository. | 5% |  |
| Include a README file that contains a description of your application. <br><br> This README must include a description of your API's available routes and their corresponding CRUD operations for reference. | 2% |  |
| Level of effort displayed in creativity, presentation, and user experience. | 5% |  |
| Use Mongoose to implement your application. <br><br> Note: The validation requirements above must still be implemented database-side, but should also be implemented application-side within your Mongoose schema(s). | +1% |  |

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

## Testing

```
{
    "user": "672990b3e95aaa2d57ce4f7c",
    "title": "What do you think about Root's UX? ",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sollicitudin eu libero vitae varius. Fusce ut orci vulputate, suscipit libero sed."
}
```

## Attributions

[Mockaroo](https://www.mockaroo.com/)
[One To Many Relations](https://medium.com/@brandon.lau86/one-to-many-relationships-with-mongodb-and-mongoose-in-node-express-d5c9d23d93c2)
[Creating Relationships with Mongoose](https://medium.com/@jaydip.vala/how-to-create-relationships-with-mongoose-4307bd4ea9a5#:~:text=Mongoose%20Relationships,the%20user%20who%20created%20it.&text=Next%2C%20a%20virtual%20property%20needs%20to%20be%20added%20onto%20the%20user.)