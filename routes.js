const express = require('express');
const router = express.Router();

const crudService = require('./service/crud');
// const authService = require('./service/auth');

router.get('/products/:product_id?', crudService.getProduct);
router.post('/products/add', crudService.addProduct);
router.delete('/products/delete/:product_id', crudService.deleteProduct);
router.patch('/products/update/:product_id', crudService.updateProduct);


module.exports = router;