import { validationResult } from 'express-validator';

export const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations in parallel
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Format errors
    const formattedErrors = errors.array().map(err => ({
      field: err.path,
      message: err.msg,
      value: err.value
    }));

    res.status(400).json({
      error: true,
      message: 'Validation failed',
      errors: formattedErrors
    });
  };
};
