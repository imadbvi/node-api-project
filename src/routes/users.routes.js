import express from 'express';
import { body } from 'express-validator';
import { usersController } from '../controllers/users.controller.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

const userValidation = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .custom((value) => {
      if (/\d/.test(value)) {
        throw new Error('Name cannot contain numbers');
      }
      return true;
    }),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
  body('phone')
    .optional()
    .matches(/^\+32\s4\d{2}\s\d{2}\s\d{2}\s\d{2}$/).withMessage('Phone must be in format +32 4xx xx xx xx')
];

router.get('/', usersController.getAll);
router.get('/:id', usersController.getOne);
router.post('/', validate(userValidation), usersController.create);
router.put('/:id', validate(userValidation), usersController.update);
router.delete('/:id', usersController.delete);

export default router;
