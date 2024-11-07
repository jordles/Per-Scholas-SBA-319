import mongoose from 'mongoose'
import User from '../models/User.js'
import Login from '../models/Login.js'
const userController = { 
  getUsers: async (req, res) => {
    try{
      // throw new Error("Forced error for testing");
      const users = await User.find({});
      if(!users) return res.status(400).json({error: "No users found"})
      res.status(200).json(users);
    } 
    catch(err){
      console.log(err);
      res.send(err.message).status(400);
    }
  },
  getUserById: async (req, res, next) => {
    try{
      if(isNaN(req.params.id)) return next()
      const user = await User.findById(req.params.id);
      if(!user) return res.status(400).json({error: "No user with that _id"})
      res.status(200).json(user);
    }
    catch(err){
      res.send(err).status(400);
    }
  },
  getUserByUserId: async (req, res) => {
    try{
      console.log(req.params.userId);
      const user = await User.findOne({userId: req.params.userId});
      if(!user) return res.status(400).json({error: "No user with that userId"})
      res.status(200).json(user);
    }
    catch(err){
      res.send(err.message).status(400);
    }
  },
  
  getUserBySearch: async (req, res) => {
    const queries = ["_id", "userId", "display", "email"];
    try{
      for(const queryKey of queries){
        if(req.query[queryKey]){
          let user = queryKey == "_id" 
            ? await User.findById(mongoose.Types.ObjectId.createFromHexString(req.query[queryKey])) 
            : queryKey == "display" 
            ? await User.find({"name.display": req.query[queryKey]}) : await User.find({[queryKey]: req.query[queryKey]});
          if(user.length === 1) user = user[0];
          if(!user || user.length === 0) return res.status(400).json({error: "No user with that " + queryKey});
          return res.status(200).json(user);
        }
      }
    }
    catch(err){
      return res.json(err.message).status(400);
    }
    res.send("You can search Users by _id, userId, display, or email").status(400);
  },
  createUserAndLogin: async (req, res) => {
    try{
      const {name, email, username, password, salt, sha256} = req.body;
      // Get the length of the collection and increment by 1
      const userCount = await User.countDocuments();
      const loginCount = await Login.countDocuments();

      // Create and save the new User
      const newUser = await User.create({
        userId: userCount + 1,
        name: {
          first: name.first,
          last: name.last,
          display: name.display
        },
        email,
        posts: []
      });

      // Create and save the new Login, passing newUser._id to the user field
      const newLogin = await Login.create({
        loginId: loginCount + 1,
        username,
        password,
        salt,
        sha256,
        email,
        user: newUser._id // Reference the newly created User's ObjectId
      });

      return res.status(200).json({newUser: newUser, newLogin: newLogin});

    }
    catch(err){
      res.status(400).send({ message: "Error creating user and login", error: err.message });
    }
  },
  updateUser: async (req, res) => {
    try{
      const user = await User.findById(req.params.id);
      if(!user) return res.status(400).json({ error: "No user with that _id" });

      for(const key in req.body){
        if(key == '_id' || key == 'userId') return res.status(400).json({ error: `Cannot change ${key}` });
        if(key == 'email') await Login.findOneAndUpdate({user: user._id}, {email: req.body.email}, {new: true});
      
        user[key] = typeof req.body[key] === 'object' && !Array.isArray(req.body[key]) ? {...user[key], ...req.body[key]} : req.body[key];
      }

      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    }
    catch(err){
      res.send(err).status(400);
    }
  },
  deleteUser: async (req, res) => {
    try{
      if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: "No user with that _id" });
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      const deletedLogin = await Login.findOneAndDelete({user: deletedUser._id});
      res.status(200).json({deletedUser, deletedLogin});
    }
    catch(err){
      res.send(err).status(400);
    }
  }
}

export default userController