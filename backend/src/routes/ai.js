const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const grokClient = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.x.ai/v1",
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post('/tailor-resume', async (req, res) => {
    const { resumeText, jobDescription } = req.body;

    try {
        const response = await grokClient.chat.completions.create({
            model: "grok-beta",
            messages: [
                { role: "system", content: "You are an expert resume writer. Tailor the following resume to match the job description provided. Emphasize relevant skills and keywords." },
                { role: "user", content: `Resume: ${resumeText}\n\nJob Description: ${jobDescription}` }
            ],
        });

        res.json({ tailoredResume: response.choices[0].message.content });
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ error: 'AI generation failed' });
    }
});

router.post('/generate-cover-letter', async (req, res) => {
    const { resumeText, jobDescription, userName } = req.body;

    try {
        const response = await grokClient.chat.completions.create({
            model: "grok-beta",
            messages: [
                { role: "system", content: "You are an expert career coach. Write a professional and personalized cover letter based on the candidate's resume and the job description." },
                { role: "user", content: `Candidate Name: ${userName}\nResume: ${resumeText}\n\nJob Description: ${jobDescription}` }
            ],
        });

        res.json({ coverLetter: response.choices[0].message.content });
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ error: 'AI generation failed' });
    }
});

module.exports = router;
