import express from 'express';
import Post from '../controllers/posts.js';

const router = express.Router();


router.get('/', Post.getPosts);
router.get('/:id', Post.getPostById);
router.get('/id/:postId', Post.getPostByPostId);

router.post('/', Post.createPost);

router.patch('/:id', Post.updatePost)

router.delete('/:id', Post.deletePost)
export default router
