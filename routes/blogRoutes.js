const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Blog routes
router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);
router.post('/', blogController.createBlog);
router.put('/:id/like', blogController.likeBlog);

// Comment routes
router.get('/:id/comments', blogController.getComments);
router.post('/:id/comments', blogController.addComment);
router.put('/comments/:id/like', blogController.likeComment);

module.exports = router; 