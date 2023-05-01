/*
Routes of user
host + /api/auth

*/
const { Router } = require('express');

const { check } = require('express-validator');

const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

//Create new user
router.post('/register',
[
    //middlewares
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    check('password', 'The password must be 6 characters').isLength({min: 6}),
    validateFields
], 
createUser );

//Login user
router.post('/login',[

    //middlewares
    check('email', 'The email is required').isEmail(),
    check('password', 'The password must be 6 characters').isLength({min: 6}),
    validateFields
], loginUser);

router.get('/renew', validateJWT , renewToken);

module.exports = router;