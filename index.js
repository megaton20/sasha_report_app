const express = require('express');
const dotenv = require("dotenv");
const session = require('express-session')
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const expressEjsLayouts = require('express-ejs-layouts');
const path = require('path')
const bodyParser = require('body-parser');
const methodOverride = require('method-override')



const app = express()

const openRouter = require('./router/openRouter')
const singlePages = require('./router/singleProtected')
const reportsRouter = require('./router/reportsRouter')
const adminRouter = require('./router/adminRouter')
const recordsRouter = require('./router/records')
const authRouter = require('./router/auth')

dotenv.config({ path: "./config/config.env" });


const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
      return next();
    } else {
      return res.render('login', {error_msg: "please login to view resources"});
    }
};


app.use(expressEjsLayouts)
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './', 'public')));


app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())

app.use(cookieParser());

app.use(session({
    secret: 'cat is alive',
    cookie: {maxAge: 600000},
    resave: false,
    saveUninitialized : true
}));


app.use(methodOverride((req, res)=>{
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        // look for urlencoded body and delete it
        let method = req.body._method
        delete req.body._method
        return method
    }
}))

app.use(flash());

//------------ Global variables 
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.warning_msg = req.flash('warning_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});





const PORT = 4000 || process.env.PORT


  
app.use('/', openRouter)
app.use('/auth', authRouter)
app.use('/welcome', isAuthenticated, singlePages)
app.use('/report',isAuthenticated, reportsRouter)
app.use('/admin',isAuthenticated, adminRouter)
app.use('/records',isAuthenticated, recordsRouter)




app.listen(PORT, console.log(`lofty heights is running on port ${PORT}`))