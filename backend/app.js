const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv/config');
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());

mongoose.set('useFindAndModify', false);

//Import Routes

const postsRoute = require('./routes/post');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');


//Routes

app.get('/', (req, res) => {
    res.send("Welcome to Home");
})


//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, (err) =>{
    if(err){
        console.log(err);
    }else{
        console.log('Connected to db');
    }
    app.use('/posts', postsRoute);
    app.use('/user', authRoute);
    app.use('/profile', userRoute);
    app.use('/category', categoryRoute);
    app.use('/product', productRoute);
    
})

app.listen(3000);