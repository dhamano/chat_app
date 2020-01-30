const { body, validationResult, sanitizeBody } = require('express-validator');

const userValidationRules = () => {
    return [
        sanitizeBody('username'),
        sanitizeBody('password'),
        body('username')
            .isString()
            .trim()
            .not().isEmpty()
            .isLength({ min: 2 }),
        body('password')
            .isString()
            .trim()
            .not().isEmpty()
            .isLength({ min: 8 })
    ]
}

const validate = (req, res, next) => {
    const errs = validationResult(req);
    if (errs.isEmpty()) return next();

    const theErrs = [];
    errs.array().map(err => theErrs.push({ [err.param] : err.msg }));

    return res.status(422).json({
        errors: theErrs
    })
}

module.exports = {
    userValidationRules,
    validate
}