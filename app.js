const express = require('express');
require('dotenv').config();
const { handleAddUser, handleGetUsers, handleUpdateUser, handleUpdatePassword } = require('./user');

const app = express();
app.use(express.json());

app.post('/addUser', handleAddUser);
app.get('/getUsers', handleGetUsers);
app.put('/updateUser/:username', handleUpdateUser);
app.put('/updatePassword/:username', handleUpdatePassword);


app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
});
