import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors";
import dotenv from 'dotenv' 
import serverless  from 'serverless-http'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app=express();
app.use(cors());
app.use(express.json());
app.use('/posts',postRoutes);
app.use('/user',userRoutes);
app.use(bodyParser.json({ limit: '50mb' })); // Increase the payload size limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Increase the payload size limit


app.get('/user', (req, res) => {
    res.status(200).json({ message: "valid hai ye" });
});

 const handler = serverless(app);
export { handler };
//mondb connection
dotenv.config()
const CONNECTION_URL = process.env.MONGODB_URI;
const PORT=process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:'true',useUnifiedTopology: 'true'})
.then(()=>app.listen(PORT,()=>console.log(`App is listen at Port:${PORT}`)))
.catch((error)=> console.log(error.message));


// mongoose.set('useFindAndModify',false);
