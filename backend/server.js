require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Companies API routes
const companyRoutes = require('./routes/companyRoutes');
app.use('/api/companies', companyRoutes);

// Basic health route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Serve static (if you want to serve frontend build from backend) - optional
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
    });
}

// Connect to MongoDB if URI is provided
const mongoUri = process.env.MONGODB_URI;
if (mongoUri) {
    mongoose.connect(mongoUri)
        .then(async () => {
            console.log('Connected to MongoDB');
            // Seed companies collection if empty
            try {
                const Company = require('./models/Company');
                const companiesData = require('./data/companies');
                const count = await Company.countDocuments();
                if (count === 0) {
                    await Company.insertMany(companiesData.map(c => ({ ...c })));
                    console.log(`Seeded ${companiesData.length} companies into MongoDB`);
                } else {
                    console.log(`Companies collection already has ${count} documents`);
                }
            } catch (seedErr) {
                console.error('Seeding companies failed:', seedErr);
            }
        })
        .catch(err => console.error('MongoDB connection error:', err));
} else {
    console.log('No MONGODB_URI provided - running without DB connection (in-memory data)');
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
