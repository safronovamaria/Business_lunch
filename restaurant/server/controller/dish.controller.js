const db = require('../db');

class DishController {
    async createDish(req, res) {
        const { name, type, menu_id } = req.body;
        const newDish = await db.query(`INSERT INTO dish (name, type, menu_id) values ($1, $2, $3) RETURNING *`, [
            name,
            type,
            menu_id,
        ]);
        res.json(newDish.rows[0]);
    }

    async getDishes(_, res) {
        const dishes = await db.query('SELECT * FROM dish');
        res.json(dishes.rows);
    }

    async getOneDish(req, res) {
        const id = req.params.id;
        const dish = await db.query('SELECT * FROM dish WHERE id = $1', [id]);
        res.json(dish.rows[0]);
    }

    async updateDish(req, res) {
        const { id, name, type, menu_id } = req.body;
        const dish = await db.query('UPDATE dish SET name = $1, type = $2, menu_id = $3 where id = $4 RETURNING *', [
            name,
            type,
            menu_id,
            id,
        ]);
        res.json(dish.rows[0]);
    }

    async deleteDish(req, res) {
        const id = req.params.id;
        const dish = await db.query('DELETE FROM dish WHERE id = $1', [id]);
        res.json(dish.rows[0]);
    }

    async getMenuDishes(req, res) {
        const menu_id = req.params.menu_id;
        const dish = await db.query('SELECT * FROM dish WHERE menu_id = $1', [menu_id]);
        res.json(dish.rows);
    }
}

module.exports = new DishController();
