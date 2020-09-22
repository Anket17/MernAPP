const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());
const router = express.Router();

//heroku
const cool = require('cool-ascii-faces');
const path = require('path');
const PORT = process.env.PORT || 5000;

const users = require('./models/User');



mongoose.connect('mongodb+srv://DevenNazare:Deven1234@cluster0.kbiua.gcp.mongodb.net/VeganCart?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true }, ()=>{
    console.log('connected')
});

const userRouter = require('./routes/User');
const { Router } = require('express');
app.use('/user', userRouter);


 app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
