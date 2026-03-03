import {Webhook} from "svix"
import User from "../models/user.js"

export const clerkWebhookHandler=async(req,res)=>{
    try{
    //create a svix webhook handler instance
    const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)
    //verify the request came from clerk
    await whook.verify(JSON.stringify(req.body),{
        "svix-id":req.headers['svix-id'],
        "svix-timestamp":req.headers['svix-timestamp'],
        "svix-signature":req.headers['svix-signature']
    })
    // getting data from the request body
    const{data,type}=req.body

    //switch case to handle different types of events
    switch(type){
        case "user.created":{
            const userData={
                _id:data.id,
                name:data.first_name+" "+data.last_name,
                email:data.email_addresses[0].email_address,
                image:data.image_url,
                resume:''
            }
            //create a new user in the database
            await User.create(userData)
            res.json({})
            break;
        }
        case "user.updated":{
            const userData={
               
                name:data.first_name+" "+data.last_name,
                email:data.email_addresses[0].email_address,
                image:data.image_url,
               
            }
            //update the user in the database
            await User.findByIdAndUpdate(data.id,userData)
            res.json({})
            break;
        }
        case "user.deleted":{
            //delete the user from the database
            await User.findByIdAndDelete(data.id)
            res.json({})
            break;
        }
        default:
            break; 
    }
}catch(error){
    console.error("Error handling Clerk webhook:",error)
    res.status(400).json({error:"Invalid webhook event"})
    }
} 