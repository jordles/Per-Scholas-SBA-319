import mongoose from 'mongoose'
import Login from '../models/Login.js'
import User from '../models/User.js'

const loginController = {
  getLogins: async (req, res) => {
    try{
      const logins = await Login.find({});
      if(!logins) return res.status(400).json({ error: 'No logins found' });
      res.status(200).json(logins);
    }
    catch(err){
      res.status(400).send(err);
    }
  },
  getLoginById: async (req, res) => {
    try{
      const login = await Login.findById(req.params.id);
      if(!login) return res.status(400).json({error: "No login with that _id"})
      res.json(login);
    }
    catch(err){
      res.status(400).send(err);
    }
  },
  getLoginByLoginId: async (req, res) => {
    try{
      const login = await Login.findOne({ loginId: req.params.loginId });
      if(!login) return res.status(400).json({error: "No login with that loginId"})
      res.json(login);
    }
    catch(err){
      res.status(400).send(err);
    }
  },
  getUserByLogin: async (req, res) => {
    try{
      const login = await Login.findById(req.params.id).populate('user');
      if(!login) return res.status(400).json({error: "No login with that _id"})
      res.json(login);
    }
    catch(err){
      res.status(400).send(err);
    }
  },
  updateLogin: async (req, res) => {
    try{
      if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: "No login with that _id" });
      const login = await Login.findById(req.params.id);
      for(const key in req.body){
        if(!(key in login.schema.paths)) return res.status(400).json({ error: `This key does not exist according to the schema: ${key}` });
        if(key == '_id' || key == 'loginId' || key == 'salt' || key == 'sha256') return res.status(400).json({ error: `Cannot change ${key}` });
        if(key == 'email') await User.findByIdAndUpdate(login.user, {email: req.body.email}, {new: true});
        // login[key] = req.body[key];
        login.set(key, req.body[key]);
      }
      const updatedLogin = await login.save();
      res.status(200).json(updatedLogin);
    }
    catch(err){
      res.json(err.message).status(400);
    }
  },
  deleteLogin: async (req, res) => {
    try{
      if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: "No login with that _id" });
      const deletedLogin = await Login.findByIdAndDelete(req.params.id);
      const deletedUser = await User.findByIdAndDelete(deletedLogin.user);
      res.status(200).json({deletedLogin, deletedUser});
    }
    catch(err){
      res.json(err.message).status(400);
    }
  }
}

export default loginController