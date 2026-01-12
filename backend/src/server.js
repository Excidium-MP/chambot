require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// DB Connection (Optional/Local)
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.error('MongoDB connection error:', err));
}

// Routes
const jobRoutes = require('./routes/jobs');
const resumeRoutes = require('./routes/resume');
const aiRoutes = require('./routes/ai');

app.use('/api/jobs', jobRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
