const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const askedQuestionRoutes = require('./routes/askedQuestionRoutes');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/questions', require('./routes/questionRoutes'));
app.use('/api/submissions', require('./routes/submissionRoutes'));
app.use('/api/askedQuestions', askedQuestionRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});