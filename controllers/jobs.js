const express = require('express');
const Job = require('../models/jobs');
const User = require('../models/user');
const jobs = express.Router();


//routes
jobs.get('/' , getAllJobs);
jobs.post('/create' , createJobs);
jobs.post('/removeAll' , removeAll);
jobs.get('/jobQuery' , randomQuery);



//functions
async function randomQuery(_req, res){    //randomly finds a user, then finds any jobs they are associated with
  try {
    const allUsers = await getAllUserIds();
    let user = allUsers[Math.floor(Math.random() * allUsers.length)]["id"];
    console.log(user);
    const jobs = await Job.find({"userInfo":user})
      .populate('userInfo')
      .exec();
    res.send(jobs);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function getAllJobs(_req, res) {
  try {
    console.log('jobs home route accessed');
    const allJobs = await Job.find({});
    res.send(allJobs);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function getAllUserIds(){   //helper function, I should add some type of error catching when this is used. If function returns error it will probably break the server
  try {
    let allUsers = await User.find({})    //only get _id data
      .select("_id")
      .exec();
    return allUsers    
  } catch (error) {
    console.log(error);
    return error
  }
}

async function createJobs(_req, res) {
  try {
    console.log('create job route accessed');
    const allUsers = await getAllUserIds();

    for (let i = 0; i < 10; i++) {
      let user = allUsers[ Math.floor(Math.random() * allUsers.length) ];
      const job = await new Job({
        jobNumber: 1000+i,
        jobDesc: 'something',
        userInfo: user,
      });
      await job.save();
    };

    res.sendStatus(200)
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

async function removeAll(_req, res) {
  try {
    Job.collection.deleteMany({});
    console.log('jobs removed');
    res.sendStatus(200);
    
  } catch (error) {
    console.log(error);
    res.sendStatus(500);    
  }

};

module.exports = jobs;