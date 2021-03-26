const express = require('express');
const router = express.Router();

const crudService = require('./service/crud');
const authService = require('./service/auth');

router.get('/products/:product_id?', crudService.getProduct);
router.post('/products/new/add', crudService.addProduct);
router.delete('/products/delete/:product_id', crudService.deleteProduct);
router.patch('/products/update/:product_id', crudService.updateProduct);

router.post('/auth/register', authService.register);
router.post('/auth/login', authService.login);
router.get('/auth/token/decode/:token', authService.decodeToken);

module.exports = router;