const Router = require('express');
const router = new Router();
const menuController = require('../controller/menu.controller');

router.post('/menu', menuController.createMenu);
router.get('/menu', menuController.getMenus);
router.get('/menu/:id', menuController.getOneMenu);
router.put('/menu', menuController.updateMenu);
router.delete('/menu/:id', menuController.deleteMenu);

module.exports = router;
