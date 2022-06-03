/*
    Rutas de usuarios
    host + /api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, userLogin, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');
const router = Router();

router.post(
    '/new',
    [
        check('name', 'Name is required').notEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password should be at leat 6 characters').isLength({min: 6}),
        validarCampos
    ],
    createUser);
router.post(
    '/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password should be at leat 6 characters').isLength({min: 6}),
        validarCampos
    ],
    userLogin);
router.get('/renew', validarJwt, renewToken);

module.exports = router;