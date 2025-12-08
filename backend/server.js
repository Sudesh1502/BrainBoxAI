


import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configDb.js';
import chatRoutes from './routes/chatRoutes.js';
import userRouter from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';


const app = express();

//pase the incoming request in json body

// CORS for browser + cookies
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://brain-box-5jyg1uu5o-sudesh-s-projects.vercel.app"
  ],
  credentials: true
}));



// Allow credentials header explicitly
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


//useing cookie parser
app.use(cookieParser());

//pase the incoming request in json body
app.use(express.json());


//routes for api
app.use('/api', chatRoutes);

//routes for authentication
app.use('/auth', userRouter)

//test end point


app.listen(process.env.PORT, () => {
  console.log("app is listening on " + process.env.PORT);
  connectDB();
})