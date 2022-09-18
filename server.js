const express=require('express')
const app=express()
const path=require('path')
const bodyparser=require('body-parser')
const session=require('express-session')
const {v4:uuidv4}=require('uuid')
//const cookieparser=require('cookie-parser')

const router=require('./router.js')

const PORT=process.env.PORT || 3000

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(function(req, res, next) {
    if (!req.user) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
    }
    next();
});

app.set('view engine','ejs')




//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUnintialized:true
}))


app.use('/route',router)


//home route
app.get('/',(req,res)=>{
    res.render('registration',{title:'Registration'})
})

//login
app.get('/login',(req,res)=>{
    res.render('base',{title:'Login'})
})

app.get('/',(req,res)=>{
    if(req.session.user){
        res.render('dashboard.ejs')
    }
    else{
        res.render('base',{title:'Login System'})
    }
})




app.listen(PORT,()=>{
    console.log(`Listening to the server on http://localhost:${PORT}`)
})










