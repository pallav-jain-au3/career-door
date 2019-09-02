const express = require('express');
const app = express();
const PORT =  process.env.PORT || 3000;
const hbs = require('hbs');
const session = require('express-session');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));

app.use('/employee', require('./routes/UserEmployeeRoute'));
app.use('/employer', require('./routes/EmployeeRoute'))

app.listen(PORT, function(){
    console.log("listenning on PORT", PORT);
})