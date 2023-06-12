const express = require('express')
const bodyParser = require('body-parser');
const cors = require("cors");

const todoRoutes = require('./routes/todo')

const app = express();
const port = 8081

app.use(cors());
app.use(bodyParser.json());

app.use('/todo',todoRoutes)

app.use((req,res,next)=>{
    const error = new HttpError('Could note find this route.',404)
    throw error
})


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message:error.message || 'An unknowm error occured'})
})


app.listen(port);
