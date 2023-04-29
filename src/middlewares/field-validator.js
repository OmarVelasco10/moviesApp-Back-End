const { response } = require("express");
const { validationResult } = require("express-validator");

//Function to help us verify each field we receive
const validateFields = (req, res = response, next) => {
  //Errors managment
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = {
  validateFields,
};
