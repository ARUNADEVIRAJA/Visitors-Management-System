// seed.js
const { insertUserData } = require('./models/user'); // Importing insertUserData function

const insertData = async () => {
  const firstName = 'saru';
  const lastName = 'Raja';
  const username = 'Saruhasan';
  const email = 'saru@example.com';
  const password = 'saru@123';
  const phoneNumber = 9600469572;
  
  const roleName = 'Admin'; // Example role
  const roleStatus = 1; // Example status (1 for active)
  try {
    // Insert user data along with the role
    const newUser = await insertUserData(firstName, lastName, username, email, password, phoneNumber, roleName, roleStatus);
    console.log('Inserted User:', newUser);
  } catch (error) {
    console.error('Error:', error);
  }
};

insertData();
