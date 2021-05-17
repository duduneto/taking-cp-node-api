const express = require('express');

const postController = require('../controllers/post/post.controller');
const multer = require('multer');

const upload = multer({ dest: 'src/uploads/' });
const router = express.Router();

//= ===============================
// Post routes
//= ===============================

router.post(
  '/',
  upload.single('audio'),
  postController.create,
);

router.get('/:audio_id',
  postController.read
)

module.exports = router;
