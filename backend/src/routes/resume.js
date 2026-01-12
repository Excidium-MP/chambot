const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.post('/upload', upload.single('resume'), async (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');

    try {
        const dataBuffer = fs.readFileSync(req.file.path);
        let text = '';

        if (req.file.mimetype === 'application/pdf') {
            const data = await pdfParse(dataBuffer);
            text = data.text;
        } else {
            // Handle DOCX or other types here
            text = 'Extracting text from non-PDF files not yet implemented in this MVP.';
        }

        res.json({
            message: 'Resume uploaded and parsed successfully',
            filename: req.file.filename,
            extractedText: text.substring(0, 500) + '...' // Return snippet for preview
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to parse resume' });
    }
});

module.exports = router;
