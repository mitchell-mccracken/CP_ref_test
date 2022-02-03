const express = require('express');
const Job = require('../models/jobs');
const User = require('../models/user');
const jobs = express.Router();
const mongoose = require('mongoose')
// const ObjectId = mongoose.Types.ObjectId;

//routes
jobs.get('/' , home);
jobs.post('/create' , createJob);
jobs.post('/removeAll' , removeAll);
jobs.get('/jobQuery' , randomQuery);



//functions
async function randomQuery(_req, res){
  try {
    const jobs = await Job.find({})
      .populate('userInfo')
      // .select("-jobNumber")
      .exec();
    // console.log(jobs);
    res.send(jobs);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function home(_req, res) {
  try {
    console.log('jobs home route accessed');
    const allJobs = await Job.find({});
    // console.log(allJobs);
    // let allUserInfo = allJobs.map(x => x.userInfo)
    // console.log(allUserInfo);
    res.send(allJobs);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function getAllUserIds(){
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

async function createJob(_req, res) {
  try {
    console.log('create job route accessed');
    const allUsers = await getAllUserIds();

    for (let i = 0; i < 10; i++) {
      let user = allUsers[ Math.floor(Math.random() * allUsers.length) ];
      console.log(user);
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