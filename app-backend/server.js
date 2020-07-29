const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const Datastore = require("nedb");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./model/user.js");
const Score = require("./model/score.js");
const path = require("path");
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

app.use('/static', express.static(path.join(__dirname, '../build//static')));

app.listen(PORT, () => console.log("Im listening on PORT:" + PORT));
//connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));

//routes
app.post('/login', (req,res)=>{
  User.findOne(req.body)
  .then(result=>{
  res.send(result)
  })
  .catch(err=>res.send(err))
})


app.post('/reg',(req,res)=>{
  User.findOne({name:req.body.name})
  .then(data=>{
  if(data){
    res.send('username exist')
  }else{
    const user = new User(req.body)
    user.save()
    .then(u=> res.send(u))
    .catch(err=>res.send(err))
  }
}).catch(err=>res.send(err))
})

app.post('/score',(req,res)=>{
  const score = new Score(req.body)
  score.save()
  .then(data=>res.send(data))
.catch(err=>res.send(err))
})


app.get('/stats/:username?',(req,res)=>{
  Score.find(req.params)
  .then(result=>res.send(result))
  .catch(err=>res.send(err))
})
app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../build/')});
});