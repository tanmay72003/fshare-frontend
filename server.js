const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 3700;

app.use(cors());
app.use(express.static('public'));
app.set('views' , path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use('/use/972003',require('./routes/show'));
app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
});