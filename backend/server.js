import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js';
import {clerkWebhooks} from './controllers/webhook.js';
// Create Express app
const app = express()

// Connect to MongoDB
 await connectDB();

// Middlewares
app.use(cors())
app.use(express.json())  

// Sample route
app.get('/',(req,res)=>{
    res.send('Hello World!')
})
app.post('/webhook',clerkWebhooks)

//Port
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})