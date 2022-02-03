const express = require('express');
const Job = require('../models/jobs');
const User = require('../models/user');
const jobs = express.Router();


//routes
jobs.get('/' , home);
jobs.post('/create' , createJob);
jobs.post('/removeAll' , removeAll);
jobs.get('/stuff' , stuff);


//functions
async function stuff(_req, res){
  try {
    const jobs = await Job.find({userInfo: '61fbf052eca2ed9c6e971dd9'})
      .populate('userInfo')
      .exec();
    console.log(jobs);


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
    console.log(allJobs);
    res.send(allJobs);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function createJob(_req, res) {
  try {
    console.log('create job route accessed');

    // //loop
    // for (let i = 0; i < 10; i++) {
    //   const job = await new Job({
    //     jobNumber: i,
    //     jobDesc: 'Description Number: ' + i,
    //   });
    //   await job.save();
    // }
    const job = await new Job({
      jobNumber: 1000,
      jobDesc: 'something',
      userInfo: '61fbf052eca2ed9c6e971dd9', 
    });
    await Job.findOne({jobNumber:1000}).populate({path: 'userInfo'}).exec();
    await job.save();

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