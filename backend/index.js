require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors")
const cookieParser=require("cookie-parser")
const PORT= 4000
const app= express();
const userRoute=require("./routes/userRoute")

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(
    cors({
      origin: ['https://zummit-chandan.vercel.app', 'http://localhost:3000','https://vaibhav-zummit-2.vercel.app'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
// app.use(
//     cors({
//         origin:["https://zummit-chandan.vercel.app",
//         "http://localhost:3000"
//     ],
//         credentials:true,
        
//     })
// )
//errorhandling
const errorHandler=require("./middleware/errorMiddleware")
app.use(errorHandler);

//Routes
app.get("/",(req,res)=>{
    res.send("homepage")
})
app.use("/api/users",userRoute);

//connect to the database
const dbConnect=require("./config/database");
dbConnect();

app.listen(PORT,()=>{
    console.log(`app run at , ${PORT}`);
})
     
