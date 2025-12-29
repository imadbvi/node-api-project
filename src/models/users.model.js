import db from '../config/database.js';

export const userModel = {
  findAll: ({ limit = 10, offset = 0, search = '', sort = 'created_at', order = 'DESC' }) => {
    let query = `SELECT * FROM users`;
    const params = [];

    if (search) {
      query += ` WHERE name LIKE ? OR email LIKE ?`;
      params.push(`%${search}%`, `%${search}%`);
    }

    // Allow sorting by allowed columns only to prevent SQL injection
    const allowedSortFields = ['id', 'name', 'email', 'created_at'];
    const sortField = allowedSortFields.includes(sort) ? sort : 'created_at';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    query += ` ORDER BY ${sortField} ${sortOrder} LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const stmt = db.prepare(query);
    return stmt.all(...params);
  },

  count: ({ search = '' }) => {
      let query = 'SELECT COUNT(*) as count FROM users';
      const params = [];
      if (search) {
          query += ` WHERE name LIKE ? OR email LIKE ? OR phone LIKE ?`;
          params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      }
      return db.prepare(query).get(...params).count;
  },

  findById: (id) => {
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  },

  create: ({ name, email, phone }) => {
    const info = db.prepare('INSERT INTO users (name, email, phone) VALUES (?, ?, ?)').run(name, email, phone);
    return db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid);
  },

  update: (id, { name, email, phone }) => {
    // Dynamic update for better patch support
    const fields = [];
    const params = [];
    if(name) { fields.push('name = ?'); params.push(name); }
    if(email) { fields.push('email = ?'); params.push(email); }
    if(phone) { fields.push('phone = ?'); params.push(phone); }
    
    if(fields.length === 0) return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    
    params.push(id);
    const result = db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`).run(...params);
    
    if (result.changes === 0) return null;
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  },

  remove: (id) => {
    const result = db.prepare('DELETE FROM users WHERE id = ?').run(id);
    return result.changes > 0;
  }
};
