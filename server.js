const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const userRoutes = require('./api/user'); // ✅ Correct router import
const app = express();


const sequelize = require('./models/index');
const {User} = require('./models/user');
const {UserRole}=require('./models/userRole');

User.associate({UserRole});
UserRole.associate({User});
sequelize.authenticate()
  .then(() => console.log('DB connected successfully'))
  .then(() => sequelize.sync({ force: false }))
  .then(() => console.log('Tables created'))
  .catch(err => console.error('Error:', err));
// Middleware for parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true
}));

// Use only this router
app.use('/api/user', userRoutes); // ✅ This works

// Session setup

app.use(express.static('public'));

// Routes
app.get('/', (req, res) => res.redirect('/login'));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'view', 'login.html')));
app.get('/viewVisitors', (req, res) => res.sendFile(path.join(__dirname, 'view', 'viewVisitors.html')));
app.get('/RegisterVisitor', (req, res) => res.sendFile(path.join(__dirname, 'view', 'RegisterVisitor.html')));
app.get('/index', (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  res.sendFile(path.join(__dirname, 'view', 'index.html'));
});
app.get('/check-session', (req, res) => {
  if (req.session.userId) {
    return res.status(200).send({ success: true, message: 'Session active' });
  } else {
    return res.status(401).send({ success: false, message: 'No active session' });
  }
});
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Failed to logout');
    res.redirect('/login');
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
