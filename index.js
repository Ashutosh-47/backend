require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT ||  8000 ;
const cors = require("cors")
const { user , detail } = require ( "./Models/Schema" )
require("./db")

app.use ( express.json() )

 app.use ( express.urlencoded ( { extended: true } ) )

 // app.use( cors )

//  app.use ( ( req , res , next ) => {

//     // localhost: 3000 because our react app is running on 3000
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     )

//     next()
  
// })


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  


app.get("/" , ( req, res ) => res.send("Working"))

//https://cars.adaptable.app



//------------------------------------------------------ Post for LogIn ------------------------------------------------
app.post ( "/" , async ( req , res ) => {

     const { email , password } = req.body ;

    try {
           const checkEmail = await user.findOne ( { email: email } )                       // To find email exist or not 

           if ( checkEmail )  res.status(200).json ( {success: true} )                           // If exist

           else  res.status(200).json ( { success: false} )

       
    }
    catch ( err ) { 
        console.log (  err ) 

        res.status(400).send ( "error" )
    } 

})


// //------------------------------------------------------- Post Signup          ---------------------------------------
app.post ( "/signup" , async ( req , res ) => {

    const { email , password } = req.body ;

    const data = {                          // As we have save user to DB
        email: email ,
        password: password
    }

    try {
           const checkEmail = await user.findOne ( { email: email } )                       // if exist dont add

           if ( checkEmail )  res.status(200).json ( { success: true} )                           // If exist

           else {

             res.status(200).json ( { success: false } )

             await user.insertMany ( [ data ] )
           }
    }
    catch ( err ) { 
        console.log ( err )
        res.status(400).send ( "error" )
    } 

})

//--------------------------------------------------- Post for details -------------------------------

app.post ( "/details" , async ( req , res) => {
    const {  title ,  color , available , model ,  price , date } = req.body ;    

    try {
        
    const data = {
        title: title ,
        color: color,
        available: available,
        model: model ,
        price: price,
        date: date
        }
    
        await detail.insertMany ( [ data ] )
        res.status(200).json ( { success: true } )
    
    }
    catch ( err ) {
        
        console.log ( err )
        
        res.status(400).json ( { success: false } )
    }
})

//------------------------------------------------------- To get Details from MongoDB for Card -------------------------------

app.get ( "/getDetail" , async ( req , res ) => {

   try{
    const data = await detail.find ( {} ) 
   res.json ( data );
   }
   catch ( err) {  res.status(400).send("error") }
})


//----------------------------------------------- ----------------- API to Search Honda-City ---------------------
app.get ( "/getHonda-City" , async ( req , res ) => {

    try{
        const arr = await detail.find ( { model: "Honda-City" } )

        res.status ( 200 ).json ( arr ) ;
    }
    catch ( err ) { res.status ( 400 ).send ( "error" ) }
} )



//--------------------------------------------------- Edit----------------------------------------------------

app.post( "/edit" , async ( req , res ) => {
    const data = req.body
 
    try {
        const arr = await detail.updateOne ( { _id: data.id } , {
            $set: { title: data.title ,
                color: data.color,
                available: data.available,
                model: data.model,
                price: data.price,
                date: data.date }
        } )
   
        res.status(200).json ( arr )
    }
    catch ( err ) { 
        res.status ( 400 ).send ( "error" )
    }
})


app.post ( "/delete" , async ( req , res ) => {
    const id = req.body.id ;

    try {
        const result = await detail.deleteOne ( { _id: id } )
    res.json( result )
    }
    catch ( err) { res.send ( "error " )}
})




app.listen ( port , () => console.log ( "App is listinging on Port 8000") )

