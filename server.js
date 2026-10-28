require('dotenv').config();

const mongoose = require("mongoose");
const express = require('express');
const dns = require('dns')
const app = express();
const authRoutes = require('./routes/authRoute');
const studentRoutes = require('./routes/studentRoute');
const facultyRoutes = require('./routes/facultyRoute');
const courseRoutes = require('./routes/courseRoute');

dns.setServers(['8.8.8.8', '1.1.1.1']);

app.use(authRoutes);
app.use(studentRoutes);
app.use(facultyRoutes);
app.use(courseRoutes);

const mongooString = process.env.MONGODB_URI

mongoose.connect(mongooString)
    .then(() => {
        console.log("DataBase Connected")
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });

    })
    .catch((erro) =>{
        console.log("Mongoose Connection is Failed")
        
    })


