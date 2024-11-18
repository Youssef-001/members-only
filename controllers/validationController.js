const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const validateSignUp = [
  body("firstName").trim().isAlpha().notEmpty(),
  body("lastName").trim().isAlpha().notEmpty(),
  body("email")
    .isEmail()
    .trim()
    .custom(async (value) => {
      let users = await db.getAllMembers();
      let emailExist = false;
      for (let i = 0; i < users.length; i++) {
        if (users[i].email == value) {
          emailExist = true;
          break;
        }
      }

      if (emailExist) throw new Error("E-mail already in use");
    }),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one digit")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain at least one special character"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Convert the errors to an object format for easier access
    const formattedErrors = errors.array().reduce((acc, error) => {
      acc[error.path] = error.msg;
      return acc;
    }, {});
    console.log(formattedErrors);
    // Render the sign-up form with errors and previous input values
    return res.render("sign-up", {
      errors: formattedErrors,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });
  }
  next();
};

module.exports = handleValidationErrors;

module.exports = { validateSignUp, handleValidationErrors };
