const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { handleMcp, methodNotAllowed } = require('./mcp/mcpRoute');

const artifactRoutes = require('./routes/artifactRoutes');
const heritageSiteRoutes = require('./routes/heritageSiteRoutes');

dotenv.config({ path: path.join(__dirname, '.env') });

const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  }),
);
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());

app.use('/api/artifacts', artifactRoutes);
app.use('/api/heritage-sites', heritageSiteRoutes);


app.post('/mcp', handleMcp);
app.get('/mcp', methodNotAllowed);
app.delete('/mcp', methodNotAllowed);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Digital Museum API is running',
  });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

startServer();
