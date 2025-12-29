import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

import userRoutes from './routes/users.routes.js';
import newsRoutes from './routes/news.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);

// Root Endpoint - Redirect to static html or serve simple html
app.use(express.static('public')); 
// If specific root route is needed alongside static, or if public/index.html covers it.
// The requirement says "Root documentation page". static 'public' is best.

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: true, message: 'Endpoint not found' });
});

// Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
