import express from 'express'; //routes
import usersRouter from "./routes/users.js";
import loginsRouter from "./routes/logins.js";
import postsRouter from "./routes/posts.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import Login from "./models/Login.js";
import fs from 'fs';

import 'dotenv/config'; //environment
import mongoose from 'mongoose'; //models


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); //parsing request bodies
app.use(express.urlencoded({ extended: true })); //parsing form data

app.use("/users", usersRouter); // set up routes
app.use("/logins", loginsRouter);
app.use("/posts", postsRouter);

mongoose.connect(process.env.ATLAS_URI);
mongoose.connection.on('connected', () => {
  console.log("Connected to Mongo!");
});

// try{ //test our mongoose connection
//   mongoose.connect(process.env.ATLAS_URI);
//   console.log("Mongoose connected to the database successfully!");
// } catch (err) {
//   console.error("Mongoose connection error:", err);
// }

// Utility function to convert "$oid" objects to Mongoose ObjectIds
function extractObjectId(id) {
  if (id && id.$oid) {
    return new mongoose.Types.ObjectId(id.$oid); // Convert "$oid" to ObjectId
  }
  // If it's already a valid ObjectId or a 24-character hex string, return it
  return mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : id;
}

async function initializeDatabase() {
  console.log("Tester please ensure you have set up the .env file with ATLAS_URI");
  try {
    mongoose.connect(process.env.ATLAS_URI);
    mongoose.connection.on('connected', () => {
      console.log("Connected to Mongo!");
    });

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Login.deleteMany({});

    // Create indexes for the collections (through mongoose Schema); commented out because i have the indexes defined in my model Schemas. 
    // await User.createIndexes();
    // await Post.createIndexes();
    // await Login.createIndexes();

    // Load and transform user data
    const userData = JSON.parse(fs.readFileSync('./testData/rootApp.users.json', 'utf8'));
    const usersWithObjectIds = userData.map(user => ({
      ...user,
      _id: extractObjectId(user._id), // Convert _id to ObjectId if needed
      posts: user.posts ? user.posts.map(postId => extractObjectId(postId)) : [] // Convert posts references
    }));
    await User.insertMany(usersWithObjectIds);

    // Load and transform login data
    const loginData = JSON.parse(fs.readFileSync('./testData/rootApp.logins.json', 'utf8'));
    const loginsWithObjectIds = loginData.map(login => ({
      ...login,
      _id: extractObjectId(login._id), // Convert _id to ObjectId if needed
      user: extractObjectId(login.user) // Convert user reference
    }));
    await Login.insertMany(loginsWithObjectIds);

    // Load and transform post data
    const postData = JSON.parse(fs.readFileSync('./testData/rootApp.posts.json', 'utf8'));
    const postsWithObjectIds = postData.map(post => ({
      ...post,
      _id: extractObjectId(post._id), // Convert _id to ObjectId if needed
      user: extractObjectId(post.user)  // Convert user ID to ObjectId
    }));
    await Post.insertMany(postsWithObjectIds);

    console.log('Database initialized successfully!');
  } catch (err) {
    console.error("Error initializing database", err);
  } finally {
    mongoose.connection.close();
  }
}

app.get("/initialize", async (req, res) => {
  await initializeDatabase();
})

app.get("/", (req, res) => {
  res.send("Welcome to the Root API.");
})

//404 error handler
app.use((_req, res) => {
  res.status(404).json({ error: "Resource Not found" });
});

// Global error handling
app.use((err, _req, res, next) => {
  console.error(err);
  res.status(500).send("Seems like we messed up somewhere...");
});

// Listen for PORT
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}.`)
})