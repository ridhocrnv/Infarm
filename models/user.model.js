const db = require('../config/db');

class UserModel {
    static async create(username, email, hashedPassword, role = 'user') {
        const [result] = await db.query(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, role]
        );
        return result.insertId;
    }

    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT id, username, email, role FROM users WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = UserModel;
