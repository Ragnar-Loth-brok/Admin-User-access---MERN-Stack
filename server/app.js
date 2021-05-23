const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes')

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(authRoutes)


mongoose.connect('mongodb://localhost:27017/prot1-auth', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => console.log('Database Connected'))
.catch(error => console.log('Database connection refused!', error))



app.listen(8000, () => console.log("listening to the port 8000"))