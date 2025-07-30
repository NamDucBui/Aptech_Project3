const createPost = require('../usecases/createPost');
const getPost = require('../usecases/getPost');
const getAllPosts = require('../usecases/getAllPosts');
const updatePost = require('../usecases/updatePost'); // Import updatePost function
const deletePost = require('../usecases/deletePost'); // Import deletePost function
const countPostReplies = require('../usecases/countPostReplies');
const countPostViews = require('../usecases/countPostViews');
const incrementPostView = require('../usecases/incrementPostView');
const incrementPostLike = require('../usecases/incrementPostLike');

const createPostHandler = (req, res) => {
    const postData = req.body; // Get post data from request
    createPost(postData, (err, results) => {
        if (err) return res.status(500).send(err.message); // Handle error if exists
        res.status(201).send('Post created!'); // Return success message
    });
};

const getPostHandler = (req, res) => {
    const { id } = req.params; // Get ID from URL parameters
    getPost(id, (err, post) => {
        if (err) return res.status(404).send(err.message); // Handle error if post not found
        res.json(post); // Return the post
    });
};

const getAllPostsHandler = (req, res) => {
    getAllPosts((err, posts) => {
        if (err) return res.status(500).send(err.message); // Handle error if exists
        res.json(posts); // Return the list of posts
    });
};

// Add updatePostHandler
const updatePostHandler = (req, res) => {
    const { id } = req.params; // Get ID from URL parameters
    const postData = req.body; // Get post data from request
    updatePost(id, postData, (err, message) => {
        if (err) return res.status(404).send(err.message); // Handle error if post not found
        res.send(message); // Return success message
    });
};

// Add deletePostHandler
const deletePostHandler = (req, res) => {
    const { id } = req.params; // Get ID from URL parameters
    deletePost(id, (err, message) => {
        if (err) return res.status(404).send(err.message); // Handle error if post not found
        res.send(message); // Return success message
    });
};

const getPostRepliesCountHandler = (req, res) => {
    const { id } = req.params;
    countPostReplies(id, (err, count) => {
        if (err) return res.status(500).send(err.message);
        res.json({ count });
    });
};

const getPostViewsHandler = (req, res) => {
    const { id } = req.params;
    countPostViews(id, (err, views) => {
        if (err) return res.status(500).send(err.message);
        res.json({ views });
    });
};

const incrementPostViewHandler = (req, res) => {
    const { id } = req.params;
    incrementPostView(id, (err) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'View count incremented successfully' });
    });
};

const incrementPostLikeHandler = (req, res) => {
    const { id } = req.params;
    incrementPostLike(id, (err) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Like count incremented successfully' });
    });
};

module.exports = {
    createPostHandler,
    getPostHandler,
    getAllPostsHandler,
    updatePostHandler, // Export updatePostHandler
    deletePostHandler, // Export deletePostHandler
    getPostRepliesCountHandler,
    getPostViewsHandler,
    incrementPostViewHandler,
    incrementPostLikeHandler
};