require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();


// local file.
const connectDB = require('./database/config/dbconn');
const defaultData = require('./default');

connectDB();


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const Port = process.env.PORT || 8000;


app.get('/', (req, res) => {
    res.send("hello from server");
})

// Router middlewares.
app.use('/auth' ,require('./routes/authRoutes'));
app.use('/product', require('./routes/productRoutes'));


app.listen(Port, () =>{
    console.log(`Server running at : ${Port}`);
});

defaultData();