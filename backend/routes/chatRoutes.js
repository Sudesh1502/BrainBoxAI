import express, { response } from 'express'
import Thread from '../modules/Thread.js';
import getOpenAiResponse from '../utils/openai.js'
import { protect } from '../utils/middlewares.js';

const chatRoutes = express.Router();

chatRoutes.post('/test', async (req, res) => {
    try {
        const thread = new Thread({
            thread_id: Date.now().toString(),
            title: "Testing create thread api post",
        });

        const response = await thread.save();

        return res.status(201).send("thread created successfully!\n" + response);
    } catch (err) {
        console.log("Failed to create a thread.\n" + err);
        return res.status(500).json({ "message": "process couldn't  be proceed!!" });
    }
});

//endpoint to get all threads
chatRoutes.get('/threads', protect, async (req, res) => {
    try {
        //fetching threads in decending order make history easy to appear
        const threads = await Thread.find({ user: req.user._id }).sort({ updatedAt: -1 });
        res.status(200).json(threads);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong" });
    }
})

//endpoint to to get a particular thread
chatRoutes.get('/thread/:threadId', protect, async (req, res) => {
    //get thread id from url
    const { threadId } = req.params;
    try {
        //finding the particular thread
        const thread = await Thread.findOne({ thread_id: threadId, user: req.user._id });

        //if thread is not present
        if (!thread) return res.status(400).json({ error: "Thread not found" });

        return res.status(200).json(thread);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong" });
    }
})


//endpoint to to delete a particular thread
chatRoutes.delete('/thread/:threadId', protect, async (req, res) => {
    //get thread id from url
    const { threadId } = req.params;
    try {
        //finding and delete the particular thread
        const thread = await Thread.findOneAndDelete({ thread_id: threadId, user: req.user._id });

        //if thread is not present
        if (!thread) return res.status(400).json({ error: "Thread not found" });

        res.status(201).json({ message: "Thread deleted Successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong" });
    }
})


//creating the chat/thread or updating the existing one
chatRoutes.post('/chat', protect, async (req, res) => {
    const { message, threadId } = req.body;

    try {
        //fiinding the thread from db based on thread id
        let thread = await Thread.findOne({ thread_id: threadId, user: req.user._id });

        if (!thread) {
            //creating new thread if thread not found
            thread = new Thread({
                thread_id: threadId,
                title: message,
                user: req.user._id,
                messages: [{ role: "user", content: message }]
            })
        } else {
            //if thread is existing 
            thread.messages.push({ role: "user", content: message });
        }

        //taking response from ai to the message we refrom user
        const aiResponse = await getOpenAiResponse(message);

        
        

        //save ai response to DB
        thread.messages.push({ role: "assistant", content: aiResponse });

        //updating the updatedAt to modification time
        thread.updatedAt = new Date();

        //saving the modifications
        await thread.save();

        //sending ai response to user
        res.status(201).json({ role: "assistant", content: aiResponse });
    } catch (err) {
        console.log("something went wrong! \n" + err);
        return res.status(500).json({ error: "Failed to send message!" });
    }
})
export default chatRoutes;