import { newsModel } from '../models/news.model.js';
import { AppError } from '../middleware/errorHandler.js';

export const newsController = {
  getAll: (req, res, next) => {
    try {
      const { limit, offset, search, sort, order } = req.query;
      
      const news = newsModel.findAll({
        limit: limit ? parseInt(limit) : 10,
        offset: offset ? parseInt(offset) : 0,
        search,
        sort,
        order
      });

      const total = newsModel.count({ search });

      res.json({
        data: news,
        meta: {
          total,
          limit: limit ? parseInt(limit) : 10,
          offset: offset ? parseInt(offset) : 0,
          count: news.length
        }
      });
    } catch (error) {
      next(error);
    }
  },

  getOne: (req, res, next) => {
    try {
      const news = newsModel.findById(req.params.id);
      if (!news) {
        throw new AppError('News post not found', 404);
      }
      res.json({ data: news });
    } catch (error) {
      next(error);
    }
  },

  create: (req, res, next) => {
    try {
      const { title, content, user_id } = req.body;
      const newPost = newsModel.create({ title, content, user_id });
      res.status(201).json({ data: newPost });
    } catch (error) {
      next(error);
    }
  },

  update: (req, res, next) => {
    try {
      const { title, content, user_id } = req.body;
      const updatedPost = newsModel.update(req.params.id, { title, content, user_id });
      
      if (!updatedPost) {
        throw new AppError('News post not found', 404);
      }

      res.json({ data: updatedPost });
    } catch (error) {
      next(error);
    }
  },

  delete: (req, res, next) => {
    try {
      const success = newsModel.remove(req.params.id);
      if (!success) {
        throw new AppError('News post not found', 404);
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};
