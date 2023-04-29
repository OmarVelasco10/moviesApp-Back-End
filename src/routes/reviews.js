/*
    Review Routes
    /api/reviews

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getReviews, updateReview, deleteReview, createReview } = require('../controllers/reviews');
const router = Router();

router.use(validateJWT);


//Get reviews
router.get('/', getReviews);

//Create a new review
router.post('/',[

    check('title', 'El titulo e sobligatorio').not().isEmpty(),
    check('description', 'La description es obligatoria').not().isEmpty(),
    check('qualification', 'La calificación es obligatoria').not().isEmpty(),

    validateFields

],createReview);

//Update review
router.put('/:id', [

    check('title', 'El titulo e sobligatorio').not().isEmpty(),
    check('description', 'La description es obligatoria').not().isEmpty(),
    check('qualification', 'La calificación es obligatoria').not().isEmpty(),

    validateFields

],updateReview)

//Delete review
router.delete('/:id', deleteReview);

module.exports = router;

