var express=require('express');
var router=express.Router()

// const credential={
//     email:'admin@gmail.com',
//     password:'admin123'
// }

const users = []

function addUser(email,password){
    users.push({'email':email,'password':password})
    console.log(users);
}

const fetchUser = ( (useremail, userpassword) => { 
    let count = 0
    
    users.forEach(u => {
        if(u.email == useremail && u.password == userpassword){
            count = 1
        }
    });  
    
    if (count == 1){
        return true
    }
    else{
        return false
    }
})


//register user
router.post('/register',(req,res)=>{
    var email1=req.body.email;
    var pass1=req.body.password;
    addUser(email1,pass1)
    res.redirect('/login')
})


//login user
router.post('/login',(req,res)=>{
      
    if( fetchUser(req.body.email,req.body.password))
    {
        req.session.user = req.body.email    
        res.redirect('/route/dashboard')
    }else{
        res.end('invalid user')
    }

})



//route for dashboard
router.get('/dashboard',(req,res)=>{
   if(req.session.user){
    
    res.render('dashboard',{user:req.session.user})
   }else{
    res.send('Unauthorized User')
   }
})



//route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base',{title:'Express',logout:'Logged out Successfully...!'})
        }
    })
})

module.exports=router;
