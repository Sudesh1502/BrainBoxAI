import express, { response } from 'express'
import Thread from '../modules/Thread.js';

const chatRoutes = express.Router();

chatRoutes.post('/test', async (req, res)=>{
    try{
        const thread = new Thread({
            thread_id:Date.now().toString(),
            title:"Testing create thread api post",
        });

        const response = await thread.save();

        return res.status(201).send("thread created successfully!\n"+response);
    }catch(err){
        console.log("Failed to create a thread.\n"+err);
        return res.status(500).json({"message":"process couldn't  be proceed!!"});
    }
});

//endpoint to get all threads
chatRoutes.get('/threads', async (req, res)=>{
    try {
        //fetching threads in decending order make history easy to appear
        const threads = await Thread.find({}).sort({updatedAt:-1});
        res.status(200).json(threads);
    } catch (err) {
        console.log(err);
        return res.status(500).json({error:"something went wrong"});
    }
})

//endpoint to to get a particular thread
chatRoutes.get('/thread/:threadId', async (req, res)=>{
    //get thread id from url
    const {threadId} = req.params;
    try {
        //finding the particular thread
        const thread = await Thread.findOne({thread_id:threadId});

        //if thread is not present
        if(!thread) return res.status(400).json({error:"Thread not found"});

        return res.status(200).json(thread);
    } catch (err) {
        console.log(err);
        return res.status(500).json({error:"something went wrong"});
    }
})


//endpoint to to delete a particular thread
chatRoutes.delete('/thread/:threadId', async (req, res)=>{
    //get thread id from url
    const {threadId} = req.params;
    try {
        //finding and delete the particular thread
        const thread = await Thread.findOneAndDelete({thread_id:threadId});

        //if thread is not present
        if(!thread) return res.status(400).json({error:"Thread not found"});

        res.status(201).json({message:"Thread deleted Successfully"});
    } catch (err) {
        console.log(err);
        return res.status(500).json({error:"something went wrong"});
    }
})
export default chatRoutes;