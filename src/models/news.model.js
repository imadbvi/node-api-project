import db from '../config/database.js';

export const newsModel = {
  findAll: ({ limit = 10, offset = 0, search = '', sort = 'created_at', order = 'DESC' }) => {
    let query = `SELECT * FROM news_posts`;
    const params = [];

    if (search) {
      query += ` WHERE title LIKE ? OR content LIKE ?`;
      params.push(`%${search}%`, `%${search}%`);
    }

    const allowedSortFields = ['id', 'title', 'created_at', 'user_id'];
    const sortField = allowedSortFields.includes(sort) ? sort : 'created_at';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    query += ` ORDER BY ${sortField} ${sortOrder} LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    return db.prepare(query).all(...params);
  },

  count: ({ search = '' }) => {
    let query = 'SELECT COUNT(*) as count FROM news_posts';
    const params = [];
    if (search) {
        query += ` WHERE title LIKE ? OR content LIKE ?`;
        params.push(`%${search}%`, `%${search}%`);
    }
    return db.prepare(query).get(...params).count;
  },

  findById: (id) => {
    return db.prepare('SELECT * FROM news_posts WHERE id = ?').get(id);
  },

  create: ({ title, content, user_id }) => {
    const info = db.prepare('INSERT INTO news_posts (title, content, user_id) VALUES (?, ?, ?)').run(title, content, user_id);
    return db.prepare('SELECT * FROM news_posts WHERE id = ?').get(info.lastInsertRowid);
  },

  update: (id, { title, content, user_id }) => {
    // Dynamically build query depending on what's provided, or assume all? 
    // For simplicity, let's assume full update or patch, but here I'll just do a standard update of all fields for simplicity 
    // BUT requirements say PUT or PATCH. I'll implement a flexible update that only updates provided fields.
    
    // Actually, to keep it simple and safe:
    let query = 'UPDATE news_posts SET ';
    const params = [];
    const updates = [];
    
    if (title) { updates.push('title = ?'); params.push(title); }
    if (content) { updates.push('content = ?'); params.push(content); }
    if (user_id) { updates.push('user_id = ?'); params.push(user_id); }
    
    if (updates.length === 0) return db.prepare('SELECT * FROM news_posts WHERE id = ?').get(id);

    query += updates.join(', ') + ' WHERE id = ?';
    params.push(id);

    const result = db.prepare(query).run(...params);
    if (result.changes === 0) return null;
    return db.prepare('SELECT * FROM news_posts WHERE id = ?').get(id);
  },

  remove: (id) => {
    const result = db.prepare('DELETE FROM news_posts WHERE id = ?').run(id);
    return result.changes > 0;
  }
};
