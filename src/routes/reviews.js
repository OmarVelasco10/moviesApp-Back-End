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

    check('title', 'The title is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    check('qualification', 'The qualification is required').not().isEmpty(),

    validateFields

],createReview);

//Update review
router.put('/:id', [

    check('title', 'The title is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    check('qualification', 'The qualification is required').not().isEmpty(),

    validateFields

],updateReview)

//Delete review
router.delete('/:id', deleteReview);

module.exports = router;

