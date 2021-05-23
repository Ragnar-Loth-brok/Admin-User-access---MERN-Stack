const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes')

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(authRoutes)


mongoose.connect('mongodb://database-domain/prot1-auth', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => console.log('Database Connected'))
.catch(error => console.log('Database connection refused!', error))

const port = "Enter_Port_Here"

app.listen(port, () => console.log("listening to the port " + port))
