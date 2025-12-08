import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './configDb.js';
import chatRoutes from './routes/chatRoutes.js';
import userRouter from './routes/authRoutes.js';

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://brainboxaiweb.netlify.app",
  "https://brain-box-5jyg1uu5o-sudesh-s-projects.vercel.app"
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());
app.use(cookieParser());

app.use('/api', chatRoutes);
app.use('/auth', userRouter);

app.listen(process.env.PORT, () => {
  console.log("app is listening on " + process.env.PORT);
  connectDB();
});
