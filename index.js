import express from 'express';
import dotenv from 'dotenv';
import { generatePDF } from './generate.js';

dotenv.config();
const app = express();
app.use(express.json());

app.post('/generate-pdf', async (req, res) => {
  try {
    const { html, name } = req.body;
    const url = await generatePDF(html, name || 'documento');
    res.json({ success: true, url });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`PDF service running on ${PORT}`));
