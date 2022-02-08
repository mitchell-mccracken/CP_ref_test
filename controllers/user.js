const express = require('express');
const User = require('../models/user');
const users = express.Router();
const Job = require('../models/jobs');
const jobs = require('./jobs');


//routes
users.get('/' , getAllUsers);
users.post('/create' , createUsers);
users.post('/removeAll' , removeAll);
users.post('/updateOne' , updateUser)


//functions

async function updateUser(_req, res){
  try {
    const randomJob = await Job.findOne({});
    // const user = await User.updateOne({_id: '62027c906a086f41381dbc89'}, {$set: {jobs: this.jobs.push(randomJob)}});
    const user = await User.findOne({_id: '62027c906a086f41381dbc89'});
    user.jobs.push(randomJob);
    await user.save()
    console.log(randomJob);
    res.send(user);
    
  } catch (error) {
    console.log(error);
    res.sendStatus(500);    
  }
}

// async function home(_req, res) {
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