const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const db=require('./models');
const {sequelize}=require('./models');
const userRoleRoutes=require('./api/userRole');
const path = require('path');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected successfully');

    await sequelize.sync({ force: false});
    console.log('Tables created');
  } catch (err) {
    console.error('Error:', err);
  }
})();

// Middleware for parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true
}));
app.use('/api', require('./api/index'));
 
app.use(express.static(path.join(__dirname,'public')));

app.use('/api/userRoleList',require('./api/userRole'));

app.use('/',require('./api/index'));
// Start server
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
