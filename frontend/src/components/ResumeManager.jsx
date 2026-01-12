import React, { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';

const ResumeManager = () => {
    const [file, setFile] = useState(null);
    const [resumeText, setResumeText] = useState('');
    const [loading, setLoading] = useState(false);
    const [tailoredText, setTailoredText] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await axios.post('http://localhost:5000/api/resume/upload', formData);
            setResumeText(response.data.extractedText);
            alert('Upload successful!');
        } catch (error) {
            console.error('Upload failed', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTailor = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/ai/tailor-resume', {
                resumeText,
                jobDescription: 'Seeking a Full Stack Developer with React and Node.js experience.'
            });
            setTailoredText(response.data.tailoredResume);
        } catch (error) {
            console.error('Tailoring failed', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Resume Management</Typography>
                <input type="file" onChange={handleFileChange} />
                <Button variant="contained" onClick={handleUpload} sx={{ ml: 2 }} disabled={loading || !file}>
                    {loading ? <CircularProgress size={24} /> : 'Upload & Parse'}
                </Button>
            </Paper>

            {resumeText && (
                <Paper sx={{ p: 3, mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>Extracted Text (Preview):</Typography>
                    <Typography variant="body2" sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: 1 }}>
                        {resumeText}
                    </Typography>
                    <Button variant="contained" color="secondary" onClick={handleTailor} sx={{ mt: 2 }} disabled={loading}>
                        Tailor for Sample Job
                    </Button>
                </Paper>
            )}

            {tailoredText && (
                <Paper sx={{ p: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>Tailored Resume Result:</Typography>
                    <Typography variant="body2" sx={{ backgroundColor: '#e3f2fd', p: 2, borderRadius: 1, whiteSpace: 'pre-wrap' }}>
                        {tailoredText}
                    </Typography>
                    <Button variant="outlined" sx={{ mt: 2 }}>Download as PDF</Button>
                </Paper>
            )}
        </Box>
    );
};

export default ResumeManager;
