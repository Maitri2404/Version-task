const fs = require('fs');
const { getUsersFromFile, isUserUnique } = require('./middleware');
const { validateUsername, validatePassword } = require('./validator');

function handleAddUser(req, res) {
  const user = {
    fullname: req.body.fullname,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  };

  if (!user.fullname || !user.username || !user.password || !user.email || !user.phoneNumber) {
    res.status(400).json({ error: 'All fields are required...!!' });
  } else if (!isUserUnique(user)) {
    res.status(400).json({ error: 'Username or email already exists...' });
  } else if (!validateUsername(user.username)) {
    res.status(400).json({ error: 'Invalid username. It should contain one capital letter and other numbers.' });
  } else if (!validatePassword(user.password)) {
    res.status(400).json({
      error: 'Invalid password. It should contain at least one capital letter, one small letter, one symbol, and a total length of 16 characters.',
    });
  } else {
    const data = getUsersFromFile();
    data.users.push(user);
    fs.writeFileSync('./users.json', JSON.stringify(data));
    res.status(201).json({ message: 'User created successfully' });
  }
}

function handleGetUsers(req, res) {
    const data = getUsersFromFile();
    const users = data.users;
    res.status(200).json(users);
  }

function handleUpdateUser(req, res) {
    const { username, fullname } = req.body;
    if(!validateUsername(username)) {
        res.status(400).json({
            error: 'Invalid username. It should have at least one capital letter, other numbers'
          });
        }else{
      const data = getUsersFromFile();
      const user = data.users.find((user) => user.username === req.params.username);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        user.username = username;
        fs.writeFileSync('./users.json', JSON.stringify(data));
        res.status(200).json({ message: 'User updated successfully' });
      }
    }
  }
  
  function handleUpdatePassword(req, res) {
    const { username, password } = req.body;
  
    if (!validatePassword(password)) {
      res.status(400).json({
        error: 'Invalid password. It should have at least one capital letter, one small letter, one symbol, and a total length of 16 characters.',
      });
    } else {
      const data = getUsersFromFile();
      const user = data.users.find((user) => user.username === req.params.username);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        user.password = password;
        fs.writeFileSync('./users.json', JSON.stringify(data));
        res.status(200).json({ message: 'Password updated successfully' });
      }
    }
  }
  
module.exports = { handleAddUser, handleGetUsers, handleUpdateUser, handleUpdatePassword };
