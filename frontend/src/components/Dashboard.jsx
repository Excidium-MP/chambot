import React from 'react';
import { Typography, Grid, Card, CardContent, Button } from '@mui/material';

const Dashboard = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>Welcome back!</Typography>
                        <Typography variant="body1">
                            You have 5 new job matches based on your preferences.
                        </Typography>
                        <Button variant="contained" sx={{ mt: 2 }}>View Matches</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>Stats</Typography>
                        <Typography variant="body2">Jobs Searched: 120</Typography>
                        <Typography variant="body2">Resumes Tailored: 12</Typography>
                        <Typography variant="body2">Applications Sent: 8</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
