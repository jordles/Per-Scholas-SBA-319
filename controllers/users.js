import User from '../models/User.js'

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
  getUserById: async (req, res) => {
    try{
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
  getUserBySearch: (req, res) => {
    
    console.log(req.query._id);
    return;
  }
}

export default userController