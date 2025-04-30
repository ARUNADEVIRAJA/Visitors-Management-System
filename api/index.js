const express = require('express');
const path = require('path');
const router = express.Router();

router.use('/user', require('./user/index'));
// Redirect to login
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../view', 'login.html'));
});
// Serve login page
router.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../view', 'login.html')));

// Serve userrole page
router.get('/userrole', (req, res) => res.sendFile(path.join(__dirname, '../view', 'userrole.html')));

//serve user page
router.get('/users', (req, res) => res.sendFile(path.join(__dirname, '../view', 'users.html')));

// Serve register visitor page
router.get('/RegisterVisitor', (req, res) => res.sendFile(path.join(__dirname, '../view', 'RegisterVisitor.html')));

// Serve dashboard (index.html) with session check
router.get('/index', (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    res.sendFile(path.join(__dirname, '../view', 'index.html'));
});

// Check active session
router.get('/check-session', (req, res) => {
    if (req.session.userId) {
        return res.status(200).send({ success: true, message: 'Session active' });
    } else {
        return res.status(401).send({ success: false, message: 'No active session' });
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send('Failed to logout');
        res.redirect('/login');
    });
});

router.post('/roles', async (req, res) => {
    try {
      const { role } = req.body;
      if (!role) return res.status(400).json({ error: "Role name is required" });
  
      const newRole = await UserRole.create({ role }); // 'status' will default to 1
      res.status(201).json(newRole);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
module.exports = router;
