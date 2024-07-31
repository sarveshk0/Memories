import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import serverless from 'serverless-http';
import postRoutes from './routes/posts.js'; // Ensure the path is correct

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/posts', postRoutes);

app.use('/', (req, res) => {
    res.json({ message: 'hello from backend' });
});

const handler = serverless(app);
export { handler };

// MongoDB connection
const CONNECTION_URL = process.env.MONGODB_URI;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error.message));
