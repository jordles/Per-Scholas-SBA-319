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

async function initializeDatabase(){
  dotenv.config();
  console.log("Tester please ensure you have set up the .env file with ATLAS_URI");
  try{
    mongoose.connect(process.env.ATLAS_URI);
    mongoose.connection.on('connected', () => {
      console.log("Connected to Mongo!");
    });

    // Clear existing data and create collections with validation
    await User.deleteMany({});
    await Post.deleteMany({});
    await Login.deleteMany({});

    // Create Indexes for the collections (through mongoose Schema)
    await User.createIndexes();
    await Post.createIndexes();
    await Login.createIndexes();

    // Upload user, login, and post data (this will insert the documents and create the collection if it doesn't exist)
    const userData = JSON.parse(fs.readFileSync('./tests/rootApp.users.json', 'utf8'));
    await User.insertMany(userData);

    
    const loginData = JSON.parse(fs.readFileSync('./tests/rootApp.logins.json', 'utf8'));
    await Login.insertMany(loginData);

    const postData = JSON.parse(fs.readFileSync('./tests/rootApp.posts.json', 'utf8'));
    await Post.insertMany(postData);

    console.log('Database initialized successfully!');
  }
  catch(err){
    console.error("Error initializing database", err);
  }
  finally {
    mongoose.connection.close();
  }

}

app.get("/initialize", async (req, res) => {
  await initializeDatabase();
  res.send("Database initialized successfully!");
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