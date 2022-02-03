const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const jobSchema = new mongoose.Schema({
  jobNumber: {type:Number},
  jobDesc: {type: String},
  userInfo: {type: ObjectId , ref:'User'}
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;