const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const express = require('express');
const users = require("./controllers/user");
const jobs = require("./controllers/jobs");


//app config
const port = 3000;
const url = 'mongodb://localhost:27017/ref-test'
const app = express();
// app.use( express.urlencoded({extended:true}));
app.use( express.json());

//mongoose connection
// const mongooseOptions = {useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(url);

app.use('/users' , users);
app.use('/jobs', jobs)

//routes
app.get('/' , myFunc);



//functions
async function myFunc(req, res) {
  try {
    console.log(req.body);
    res.send('this worked')
  } catch (error) {
    console.log(error);
    res.send('dont panic')
  }
};
   



mongoose.connection.once('open', () => { console.log('connected to mongo at' + url);})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})

