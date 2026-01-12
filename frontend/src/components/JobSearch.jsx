import React, { useState } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';

const JobSearch = () => {
    const [keywords, setKeywords] = useState('');
    const [location, setLocation] = useState('');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/jobs/search`, {
                params: { keywords, location }
            });
            setJobs(response.data);
        } catch (error) {
            console.error('Search failed', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Find Your Next Role</Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField 
                        label="Keywords (e.g. React)" 
                        fullWidth 
                        value={keywords} 
                        onChange={(e) => setKeywords(e.target.value)}
                    />
                    <TextField 
                        label="Location (e.g. Remote)" 
                        fullWidth 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </Box>
                <Button variant="contained" onClick={handleSearch} disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Search Jobs'}
                </Button>
            </Paper>

            <List>
                {jobs.map((job) => (
                    <ListItem key={job.id} divider>
                        <ListItemText 
                            primary={job.title} 
                            secondary={`${job.company} - ${job.location} (${job.type})`} 
                        />
                        <Button variant="outlined" size="small">Customize for this job</Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default JobSearch;
