import mongoose from "mongoose"
import Post from "../models/Post.js"
import User from "../models/User.js"

const postController = {
  getPosts: async (req, res) => {
    try{
      const posts = await Post.find({});
      if(!posts) return res.status(400).json({ error: 'No posts found' });
      res.status(200).json(posts);
    }
    catch(err){
      res.status(400).send(err);
    }
  },
  getPostById: async (req, res, next) => {
    try{
      if(isNaN(req.params.id) && !mongoose.Types.ObjectId.isValid(req.params.id)) return next()
      const post = await Post.findById(req.params.id);
      if(!post) return res.status(400).json({ error: 'No post with that _id' });
      res.status(200).json(post);
    }
    catch(err){
      res.status(400).send(err);
    }
  },
  getPostByPostId: async (req, res) => {
    try{
      const post = await Post.findOne({postId: req.params.postId});
      if(!post) return res.status(400).json({ error: 'No post with that postId' });
      res.status(200).json(post);
    }
    catch(err){
      res.status(400).send(err);
    }
  },
  createPost: async (req, res) => {
    try{
      const lastPost = await Post.findOne().sort({ postId: -1 });  // Sort by postId descending
      const newPostId = lastPost ? lastPost.postId + 1 : 1;
      const newPost = await Post.create({
        postId: newPostId,
        ...req.body,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19)
      });

      await newPost.validate();
      await newPost.save();

      const user = await User.findById(req.body.user);
      if(!user) return res.status(400).json({ error: 'No user with that _id' });
      user.posts.push(newPost._id);

      await user.save();
      res.status(200).json({newPost, addedPostOnUser: newPost._id});
    }
    catch(err){
      res.status(400).send(err);
    }
  },
  updatePost: async (req, res) => {
    try{
      if(!req.body.content) return res.status(400).json({ error: "You can only change the content of the post" });
      const updatedPost = await Post.findByIdAndUpdate(req.params.id, { content: req.body.content }, {new: true});
      res.status(200).json(updatedPost);
    }
    catch(err){
      res.status(400).send(err.message);
    }
  },
  deletePost: async (req, res) => {
    try{
      if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: "No post with that _id" });
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
      if(!deletedPost) return res.status(400).json({ error: "No post with that _id" });
      const user = await User.findById(deletedPost.user);
      await user.posts.pull(deletedPost._id);
      await user.validate();
      await user.save();
      res.status(200).json({deletedPost, deletedPostOnUser: deletedPost._id});
    }
    catch(err){
      res.status(400).send(err.message);
    }
  }
}

export default postController