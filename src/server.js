import express from 'express';
import dotenv from 'dotenv';
import pino from 'pino-http';
import cors from 'cors';


dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(pino({prettyPrint: true}));
app.use(express.json());
app.use(cors());

app.get('/notes', (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes'
  });
});

app.get('/notes/:noteId', (req, res) => {

  const noteId = req.params.noteId;

  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`
  });
});

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
