import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './configDb.js';
import chatRoutes from './routes/chatRoutes.js';
import userRouter from './routes/authRoutes.js';

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://brain-box-5jyg1uu5o-sudesh-s-projects.vercel.app",
    "https://693714f922de7dc78b0ccafa--brainboxaiweb.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api', chatRoutes);
app.use('/auth', userRouter);

app.listen(process.env.PORT, () => {
  console.log("app is listening on " + process.env.PORT);
  connectDB();
});
