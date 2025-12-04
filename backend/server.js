


import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configDb.js';
import chatRoutes from './routes/chatRoutes.js';
const app = express();

//pase the incoming request in json body
app.use(express.json());

//validating authorized req
app.use(cors())

//routes for api
app.use('/api',chatRoutes);

//test end point


app.listen(process.env.PORT, () => {
    console.log("app is listening on " + process.env.PORT);
    connectDB();
})