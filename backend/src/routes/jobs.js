const express = require('express');
const router = express.Router();
const axios = require('axios');

// Mock search for MVP
router.get('/search', async (req, res) => {
    const { keywords, location, type } = req.query;
    try {
        // In a real scenario, you'd call LinkedIn, Indeed, or Upwork APIs here.
        // For the MVP, we return a mock response or use a simple public RSS/API if available.
        // Example: Fetching from a public job API or mock data
        const mockJobs = [
            { id: 1, title: 'Full Stack Developer', company: 'GlobalTech', location: 'Remote', type: 'Full-time', description: 'React and Node.js expert needed.' },
            { id: 2, title: 'Node.js Backend Engineer', company: 'LatAm Startups', location: 'Argentina', type: 'Contract', description: 'Experience with Express and MongoDB.' }
        ];

        // Filter based on query if needed
        const results = mockJobs.filter(job => 
            (!keywords || job.title.toLowerCase().includes(keywords.toLowerCase())) &&
            (!location || job.location.toLowerCase().includes(location.toLowerCase()))
        );

        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

module.exports = router;
