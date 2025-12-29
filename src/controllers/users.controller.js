import { userModel } from '../models/users.model.js';
import { AppError } from '../middleware/errorHandler.js';

export const usersController = {
  getAll: (req, res, next) => {
    try {
      const { limit, offset, search, sort, order } = req.query;
      
      const users = userModel.findAll({
        limit: limit ? parseInt(limit) : 10,
        offset: offset ? parseInt(offset) : 0,
        search,
        sort,
        order
      });

      const total = userModel.count({ search });

      res.json({
        data: users,
        meta: {
          total,
          limit: limit ? parseInt(limit) : 10,
          offset: offset ? parseInt(offset) : 0,
          count: users.length
        }
      });
    } catch (error) {
      next(error);
    }
  },

  getOne: (req, res, next) => {
    try {
      const user = userModel.findById(req.params.id);
      if (!user) {
        throw new AppError('User not found', 404);
      }
      res.json({ data: user });
    } catch (error) {
      next(error);
    }
  },

  create: (req, res, next) => {
    try {
      const { name, email, phone } = req.body;
      const newUser = userModel.create({ name, email, phone });
      res.status(201).json({ data: newUser });
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return next(new AppError('Email already exists', 400));
      }
      next(error);
    }
  },

  update: (req, res, next) => {
    try {
      const { name, email, phone } = req.body;
      const updatedUser = userModel.update(req.params.id, { name, email, phone });
      
      if (!updatedUser) {
        throw new AppError('User not found', 404);
      }

      res.json({ data: updatedUser });
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return next(new AppError('Email already exists', 400));
      }
      next(error);
    }
  },

  delete: (req, res, next) => {
    try {
      const success = userModel.remove(req.params.id);
      if (!success) {
        throw new AppError('User not found', 404);
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};
