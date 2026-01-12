import React, { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab, Paper } from '@mui/material';
import Dashboard from './components/Dashboard';
import JobSearch from './components/JobSearch';
import ResumeManager from './components/ResumeManager';

function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
          Chambot
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
          Your Personal Job Search Assistant
        </Typography>

        <Paper sx={{ width: '100%', mt: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Dashboard" />
            <Tab label="Job Search" />
            <Tab label="Resume & AI" />
          </Tabs>
        </Paper>

        <Box sx={{ mt: 3 }}>
          {tabValue === 0 && <Dashboard />}
          {tabValue === 1 && <JobSearch />}
          {tabValue === 2 && <ResumeManager />}
        </Box>
      </Box>
    </Container>
  );
}

export default App;
