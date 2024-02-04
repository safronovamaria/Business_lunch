const db = require('../db');

class MenuController {
    async createMenu(req, res) {
        const { day } = req.body;
        const newMenu = await db.query(`INSERT INTO menu (day) values ($1) RETURNING *`, [day]);
        res.json(newMenu.rows[0]);
    }

    async getMenus(req, res) {
        const menus = await db.query('SELECT * FROM menu');
        res.json(menus.rows);
    }

    async getOneMenu(req, res) {
        const id = req.params.id;
        const menu = await db.query('SELECT * FROM menu WHERE id = $1', [id]);
        res.json(menu.rows[0]);
    }

    async updateMenu(req, res) {
        const { id, day } = req.body;
        const menu = await db.query('UPDATE menu set day = $1 where id = $2 RETURNING *', [day, id]);
        res.json(menu.rows[0]);
    }

    async deleteMenu(req, res) {
        const id = req.params.id;
        await db.query('DELETE FROM dish WHERE menu_id = $1', [id]);
        const menu = await db.query('DELETE FROM menu WHERE id = $1', [id]);
        res.json(menu.rows[0]);
    }
}

module.exports = new MenuController();
