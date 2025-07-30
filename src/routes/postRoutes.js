const express = require('express');
const {
    createPostHandler,
    getPostHandler,
    getAllPostsHandler,
    updatePostHandler,
    deletePostHandler,
    getPostRepliesCountHandler,
    getPostViewsHandler,
    incrementPostViewHandler,
    incrementPostLikeHandler
} = require('../controllers/postController');

const router = express.Router();

// Define routes for posts
router.post('/', createPostHandler); // Create a new post
router.get('/:id', getPostHandler); // Get a post by ID
router.get('/', getAllPostsHandler); // Get all posts
router.put('/:id', updatePostHandler); // Update a post by ID
router.delete('/:id', deletePostHandler); // Delete a post by ID
router.get('/:id/replies/count', getPostRepliesCountHandler); // Add this route
router.get('/:id/views', getPostViewsHandler); // Get view count
router.post('/:id/views', incrementPostViewHandler); // Increment view count
router.post('/:id/likes', incrementPostLikeHandler); // Add new route for liking posts

module.exports = router;