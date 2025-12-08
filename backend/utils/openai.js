import dotenv from 'dotenv/config';

const getOpenAiResponse = async (message) => {
    
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-5-mini",
                messages: [

                    {
                        "role": "user",
                        "content": message
                    }
                ]
            })
        }

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", options);
            let data = await response.json();
            // console.log(data);
            return data.choices[0].message.content;

        } catch (err) {
            console.log(err)
        }
    
}

export default getOpenAiResponse;