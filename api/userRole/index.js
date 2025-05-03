const express = require('express');
const router = express.Router();
const controller = require('./userrole'); 

router.post('/create', controller.create);
router.get('/get', controller.get);
router.get('/get/:id', controller.getById);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);

module.exports = router;
