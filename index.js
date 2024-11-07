import express from 'express'; //routes
import usersRouter from "./routes/users.js";
import loginsRouter from "./routes/logins.js";
import postsRouter from "./routes/posts.js";


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