const express = require('express');
const jwt = require('jsonwebtoken');
const postController = require('../controllers/post/post.controller');
const multer = require('multer');

const upload = multer({ dest: 'src/uploads/' });
const router = express.Router();

//= ===============================
// Post routes
//= ===============================
router.get('/:audio_id',
  postController.read
)

router.use((request, response, next) => {
  console.log('Middleware para Posts ==> ', request.headers);
  if(request.headers.authorization) {
    const token = request.headers.authorization.split('Bearer ')[1];
    jwt.verify(token, '123456', (err, decoded) => {
      if(!err) {
        console.log('Token Decoded => ', decoded);
        request.userId = decoded.user.userId
        next()
      } else {
        console.log('Token Error err => ', err)
        return response.status(403).json({error: true, errorMessage: err.message})
      }
    })
  } else {
    response.status(403).json({error: true, errorMessage: 'Token não informado'})
  }
});

router.post(
  '/',
  upload.single('audio'),
  postController.create,
);


module.exports = router;
