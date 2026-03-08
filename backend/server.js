import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js';
import {clerkWebhook }from './controllers/webhook.js';
import companyRoutes from './routes/companyRoutes.js';
import connectCloudinary from './config/Cloudinary.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'
// Create Express app
const app = express()

// Connect to MongoDB
 await connectDB();
 await connectCloudinary();
// Middlewares
app.use(cors())
app.use(express.json())  
app.use(clerkMiddleware())

// Sample route
app.get('/',(req,res)=>{
    res.send('Hello World!')
})
app.post('/webhook',clerkWebhook)
app.use('/api/company',companyRoutes);
app.use('/api/jobs',jobRoutes);
app.use('/api/users',userRoutes);

//Port
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})