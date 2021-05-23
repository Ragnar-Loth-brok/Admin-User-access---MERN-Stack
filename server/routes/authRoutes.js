const { Router } = require('express');
const authController = require('../controllers/authController');
const { authReq } = require('../middlewares/authMiddleware');

const router = Router();

router.post('/register', authController.register_post );

router.post('/signin', authController.signin_post);

router.post('/form', authController.form_post);

router.post('/protected', authReq, authController.protected_post);

router.post('/refresh', authController.renewToken_post);

router.get('/form', authController.form_get);

module.exports = router