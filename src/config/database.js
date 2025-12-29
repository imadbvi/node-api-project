import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize DB
const dbPath = path.resolve(__dirname, '../../database.sqlite');
const db = new Database(dbPath, { verbose: console.log });

// Create Tables
const initDb = () => {
    // Users Table
    db.prepare(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `).run();

    // NewsPosts Table
    db.prepare(`
        CREATE TABLE IF NOT EXISTS news_posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            user_id INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `).run();

    // Seeding
    const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
    if (userCount.count === 0) {
        console.log('Seeding Database...');
        const insertUser = db.prepare('INSERT INTO users (name, email, phone) VALUES (?, ?, ?)');
        
        insertUser.run('John Doe', 'john@example.com', '+32 400 00 00 01');
        insertUser.run('Jane Smith', 'jane@example.com', '+32 400 00 00 02');
        insertUser.run('Alice Johnson', 'alice@example.com', '+32 400 00 00 03');

        const insertNews = db.prepare('INSERT INTO news_posts (title, content, user_id) VALUES (?, ?, ?)');
        insertNews.run('First News', 'This is the first news article.', 1);
        insertNews.run('Breaking News', 'Something important happened today!', 1);
        insertNews.run('Tech Update', 'Node.js is awesome.', 2);
        insertNews.run('Sports', 'Local team wins championship.', 3);
        console.log('Seeding Completed.');
    }
};

initDb();

export default db;
