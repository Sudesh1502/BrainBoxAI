


import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configDb.js';
import chatRoutes from './routes/chatRoutes.js';
import userRouter from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';


const app = express();

//pase the incoming request in json body


//validating authorized req
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


//useing cookie parser
app.use(cookieParser());

//pase the incoming request in json body
app.use(express.json());


//routes for api
app.use('/api',chatRoutes);

//routes for authentication
app.use('/auth', userRouter)

//test end point


app.listen(process.env.PORT, () => {
    console.log("app is listening on " + process.env.PORT);
    connectDB();
})