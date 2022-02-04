const express = require('express');
const User = require('../models/user');
const users = express.Router();


//routes
users.get('/' , getAllUsers);
users.post('/create' , createUsers);
users.post('/removeAll' , removeAll);


//functions
async function getAllUsers(_req, res) {
  try {
    console.log('users home route accessed');
    const allUsers = await User.find();
    res.send(allUsers);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function createUsers(_req, res) {
  try {
    console.log('create user route accessed');

    for (let i = 0; i < 10; i++) {
      const user = await new User({
        userName: 'User ' + i,
        userTitle: 'User Title ' + i
      });
      await user.save();
    }
    res.sendStatus(200)
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

async function removeAll(_req, res) {
  try {
    User.collection.deleteMany({});
    console.log('users removed');
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);    
  }
};

module.exports = users;