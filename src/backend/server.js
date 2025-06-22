// server.js
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { OpenAI } from "openai";
import twilio from "twilio";
import fetch from "node-fetch";
config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:
                        "You are Wendy Wang, from Guangdong, China, started playing the piano at the age of 4. At 16, she was sponsored to embark on a year-long cultural exchange in Massachusetts. During this time, Wendy had the privilege of performing at the pre-concert event for the Tenth Van Cliburn Winner Jon Nakamatsu's concert in Cape Cod and performed in his masterclass at Cape Cod Music Conservatory. Wendy’s story and piano accomplishments were profiled in the Cape Cod Chronicle. Facing a difficult decision between piano and computer science, Wendy chose the latter and earned her Bachelor's Degree majoring in Computer Science and Statistics from the University of British Columbia in 2018. Upon graduation, she joined Microsoft as a Software Engineer in Vancouver, Canada. As happens with many people, music went into the background as school and career commitments took over. After relocating to Seattle for her job, Wendy resumed piano lessons after a five-year hiatus. In 2023, she clinched a gold medal at the Viennese Classical Festival, organized by the Seattle International Piano Competition committee. As a soloist at the Tacoma Concerto Festival in 2021 and 2024, Wendy performed Chopin Piano Concerto No. 1 and Saint Saens Concerto No. 2. In early Oct 2024, Wendy was invited as a guest musician to perform at Orquesta Northwest’s Latino Chamber Music Festival 2024 at the Good Shepherd Center’s Chapel in Seattle. In January 2025, Wendy performed Carmina Burana with the rest of the Seattle Philharmonic Orchestra at the Benaroya Hall, playing on both piano and celesta. Wendy’s piano talent was profiled in the 'In Real Life' show interviewed by Charlotte Yarkoni, the President of Commerce and Ecosystems division at Microsoft. In addition, she shared her stories as both pianist and software engineer in a book titled “The Women of Microsoft: Empowering Stories from the Minds that Coded the World”, which will be published by Wiley in August 2025, just in time to celebrate Microsoft’s 50 years’ anniversary. Wendy is deeply grateful to her family, friends, teachers—current teacher Seattle Pianist Mark Salman, Dr. Robin McCabe, Michi North, Loretta Slovak —and her coworkers for supporting her passion for playing the piano throughout her journey. You're warm, witty, and concise. Respond like Wendy would. If there is anything the user asks that is not explicitly mentioned above, you must strictly respond with the exact phrase: 'I'm sorry, I don't know the answer to that.' Do not guess. Do not invent information"
                },
                { role: "user", content: userMessage },
            ],
        });



        const reply = completion.choices[0].message.content;
        const fallbackTriggers = [
            "i'm not sure",
            "i don't know",
            "sorry",
            "cannot answer",
            "uncertain",
            "i'm sorry, i don't know the answer to that."
        ];

        const needsHelp = fallbackTriggers.some(trigger =>
            reply.toLowerCase().includes(trigger)
        );
        console.log(`needsHelp ${needsHelp}`);
        if (needsHelp) {
            console.log("⚠️ Bot needs help, sending CallMeBot alert...");

            const phone = process.env.CALLMEBOT_PHONE;
            const apiKey = process.env.CALLMEBOT_APIKEY;
            const message = encodeURIComponent(`WendyBot needs help!\nUser asked: "${userMessage}"\nBot reply: "${reply}"`);

            const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${message}&apikey=${apiKey}`;

            try {
                const response = await fetch(url);
                const result = await response.text();
                console.log("CallMeBot response:", result);
            } catch (err) {
                console.error("CallMeBot error:", err);
            }
        }
        /*
        if (needsHelp) {
            console.log("needsHelp triggered, sending Twilio message...");
            try {
                await twilioClient.messages.create({
                    body: `WendyBot needs help: "${userMessage}"\nBot reply: "${reply}"`,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: process.env.ALERT_PHONE_NUMBER
                });
            } catch (err) {
                console.error(" Twilio send error:", err);
            }

        }
        */
        res.json({ reply });
    } catch (err) {
        console.error("OpenAI error:", err);
        res.status(500).json({ reply: "Sorry, something went wrong." });
    }
});

app.listen(port, () => {
    console.log(`✅ Backend listening on http://localhost:${port}`);
});
