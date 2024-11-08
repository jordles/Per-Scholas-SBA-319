
# SBA 319 - Mongoose / MongoDB Database Application (Root)

This Database uses the following collections: Users, Logins, and Posts.  
The Mongoose Schemas utilize reference fields between collections to create relational databases. 

## API Features
* Users can sign up and view their account details in the Root database. 
* View your posting history and alter its contents.
* This API follows RESTful practices, including invoking CRUD operations.

## Testing

### Creating the initial database

1. Start the server

2. in your browser navigate to URL: localhost:3000/initialize

### Testing Samples for POST requests (user & post)

<pre>{
  "name": {
    "first": "Tester",
    "last": "Learner",
    "display": "Per Scholas"
  },
  "email": "ps@example.com",
  "username": "perscholas123",
  "password": "12345"
}
</pre>
<pre>
{
    "user": "672990b3e95aaa2d57ce4f7c",
    "title": "What do you think about Root's UX? ",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sollicitudin eu libero vitae varius. Fusce ut orci vulputate, suscipit libero sed."
}
</pre>

### Validation (to meet the rubric requirement)

Here are a couple images of mongoose validating requests that were not valid. 

![](https://raw.githubusercontent.com/jordles/Per-Scholas-SBA-319/refs/heads/main/images/schemaValidationPosts.png)
![](https://raw.githubusercontent.com/jordles/Per-Scholas-SBA-319/refs/heads/main/images/schemaValidator.png)
![](https://raw.githubusercontent.com/jordles/Per-Scholas-SBA-319/refs/heads/main/images/schemaValidator2.png)
![](https://raw.githubusercontent.com/jordles/Per-Scholas-SBA-319/refs/heads/main/images/schemaValidator3.png)

## Overview Directory
    .
    ├── controllers             # Controllers (functions for my routers)
    │   ├── logins
    │   ├── posts 
    │   └── users
    ├── images
    ├── middleware              # Middleware (custom)
    │   └── users                 # hashing my password into sha256
    ├── models                  # Models (define Mongoose Schemas)
    │   ├── Login
    │   ├── Post 
    │   └── User            
    ├── routes                  # routes (users, logins, posts)
    │   ├── users
    │   ├── logins              
    │   └── posts
    ├── testData                # testData (Used for testing, run /initiative)
    │   ├── rootApp.logins               
    │   ├── rootApp.posts           
    │   └── rootApp.users
    ├── .env
    ├── .gitignore
    ├── index
    ├── package-lock.json
    ├── package.json
    └── readme.md

## API Endpoints

#### Default
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | / | Get a welcome message to the Root API |
| GET | /initialize | Create your database | 

#### Users

| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | /users | Retrieve all users |
| GET | /users/:id | Retrieve user based on _id |
| GET | /users/id/:userId | Retrieve user based on userId |
| GET | /users/:id/posts | Populate the posts inside the User | 
| GET | /users/search?_id= | Retrieve user based on query _id |
| GET | /users/search?userId= | Retrieve user based on query userId |
| GET | /users/search?display= | Retrieve user based on query display |
| GET | /users/search?email= | Retrieve user based on query email |
| POST | /users | Create a new User and Login Information |
| PATCH | /users/:id | Update user based on the _id | 
| DELETE | /users/:id | Delete user based on the _id |

#### Logins (Accessible by Admins)

| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | /logins | Retrieve a list of login information of users |
| GET | /logins/:id | Retrieve a user's login information based on _id |
| GET | /logins/id/:loginId | Retrieve a user's login information based on loginId |
| GET | /logins/:id/user | Populate the user information inside the Login |
| PATCH | /logins/:id | Update a user's login information based on _id |
| DELETE | /logins/:id | Delete the user and their login information based on _id | 

#### Posts

| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | /posts | Retrieve all posts information |
| GET | /posts/:id | Retrieve post based on the _id |
| GET | /posts/id/:postId | Retrieve post based on the postId |
| POST | /posts | Create a new post |
| PATCH | /posts/:id | Updates a post based on _id |
| DELETE | /posts/:id | Deletes a post based on _id | 

## Requirements

| Requirement | Weight | Finished |
| :-- | :--: | :--: |
| Use at least three different data collections within the database (such as users, posts, or comments). | 5% | ✅ |
| Utilize reasonable data modeling practices. | 10% | ✅ |
| Create GET routes for all data that should be exposed to the client, using appropriate query commands to retrieve the data from the database. | 10% | ✅ |
| Create POST routes for data, as appropriate, using appropriate insertion commands to add data to the database. At least one data collection should allow for client creation via a POST request. | 10% | ✅ |
| Create PATCH or PUT routes for data, as appropriate, using appropriate update commands to change data in the database. At least one data collection should allow for client manipulation via a PATCH or PUT request. | 10% | ✅ |
| Create DELETE routes for data, as appropriate, using appropriate delete commands to remove data from the database. At least one data collection should allow for client deletion via a DELETE request. | 10% | ✅ |
| Include sensible indexes for any and all fields that are queried frequently. For fields that may have a high write-to-read ratio, you may forgo indexes for performance considerations. Make comments of this where applicable. | 5% | ✅ |
| Include sensible MongoDB data validation rules for at least one data collection. <br><br> Note: this may be accomplished in a number of ways. If you choose to perform this task outside of your application's code, you must include a way to test the validation within the application's routes. This can be as simple as providing a POST route that attempts to create an invalid document and displays the resulting error. **I took picture to showcase the validation errors** | 5% | ✅ |
| Populate your application's collections with sample data illustrating the use case of the collections. You must include at least five sample documents per collection. <br><br> Note: Double-check this requirement before submission. Testing your delete routes may leave you under the requirement. To be safe, populate your collections with sample data well above the requirement (we recommend 10-20 documents). **Please run the root path /initiative to get your own database on your mongodb** | 5% | ✅ |
| Utilize reasonable code organization practices. | 5% | ✅ |
| Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit). | 10% | ✅ |
| Commit frequently to the git repository. | 5% | ✅ |
| Include a README file that contains a description of your application. <br><br> This README must include a description of your API's available routes and their corresponding CRUD operations for reference. | 2% | ✅ |
| Level of effort displayed in creativity, presentation, and user experience. | 5% | ✅ |
| Use Mongoose to implement your application. <br><br> Note: The validation requirements above must still be implemented database-side, but should also be implemented application-side within your Mongoose schema(s). | +1% | ✅ |

## Relational Database on Mongoose

I wasn't sure how to make mockaroo incorporate relational database. I saved a list of ObjectIds' and hard coded them into a custom list to have the same objectId when i generate the rest of the data from mockaroo. 

![](https://raw.githubusercontent.com/jordles/Per-Scholas-SBA-319/refs/heads/main/images/mockaroo_login.png)

![](https://raw.githubusercontent.com/jordles/Per-Scholas-SBA-319/refs/heads/main/images/mockaroo_posts.png)

I also pass the same objectid from posts collection back into my users collection, I utilized some commands on the mongodb shell to create a posts array and push the relevant posts' ObjectIds. So any future posts that have a corresponding user ObjectId, it will push its own ObjectId to users to keep it relational. 

<pre>
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
</pre>

I was able to get the relational database to work, and I utilized populate() here:  

![](https://raw.githubusercontent.com/jordles/Per-Scholas-SBA-319/refs/heads/main/images/relationalDataResults.png)

## Attributions

[Mockaroo](https://www.mockaroo.com/)  
[One To Many Relations](https://medium.com/@brandon.lau86/one-to-many-relationships-with-mongodb-and-mongoose-in-node-express-d5c9d23d93c2)  
[Creating Relationships with Mongoose](https://medium.com/@jaydip.vala/how-to-create-relationships-with-mongoose-4307bd4ea9a5#:~:text=Mongoose%20Relationships,the%20user%20who%20created%20it.&text=Next%2C%20a%20virtual%20property%20needs%20to%20be%20added%20onto%20the%20user.)  
