const Router = require('express');
const router = new Router();
const dishController = require('../controller/dish.controller');

router.post('/dish', dishController.createDish);
router.get('/dish', dishController.getDishes);
router.get('/dish/:id', dishController.getOneDish);
router.get('/menu_dishes/:menu_id', dishController.getMenuDishes);
router.put('/dish', dishController.updateDish);
router.delete('/dish/:id', dishController.deleteDish);

module.exports = router;
