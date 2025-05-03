// api/userRole/index.js
const express = require('express');
const router = express.Router();
const { addRole, getRole, updateRole, deleteRole } = require('./userRole');

// Add Role
router.post('/addrole', addRole);

// Get All Roles
router.get('/getroles', getRole);

// Update Role
router.put('/updaterole/:id', updateRole);

// Delete Role
router.delete('/deleterole/:id', deleteRole);

module.exports = router;