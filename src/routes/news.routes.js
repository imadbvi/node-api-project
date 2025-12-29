import express from 'express';
import { body } from 'express-validator';
import { newsController } from '../controllers/news.controller.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

const newsValidation = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string'),
  body('content')
    .notEmpty().withMessage('Content is required')
    .isString().withMessage('Content must be a string'),
  body('user_id')
    .notEmpty().withMessage('User ID is required')
    .isInt().withMessage('User ID must be an integer')
];

router.get('/', newsController.getAll);
router.get('/:id', newsController.getOne);
router.post('/', validate(newsValidation), newsController.create);
router.put('/:id', validate(newsValidation), newsController.update);
router.delete('/:id', newsController.delete);

export default router;
