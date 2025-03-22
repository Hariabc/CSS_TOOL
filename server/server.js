const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gradient-app')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Models
const gradientSchema = new mongoose.Schema({
  type: { type: String, required: true },
  angle: { type: Number },
  colors: [
    {
      color: { type: String, required: true },
      position: { type: Number, required: true }
    }
  ],
  cssCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const paletteSchema = new mongoose.Schema({
  baseColor: { type: String, required: true },
  paletteType: { type: String, required: true },
  colors: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now }
});

const Gradient = mongoose.model('Gradient', gradientSchema);
const Palette = mongoose.model('Palette', paletteSchema);

// Routes
// Gradient routes
app.get('/api/gradients', async (req, res) => {
  try {
    const gradients = await Gradient.find().sort({ createdAt: -1 });
    res.json(gradients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/gradients', async (req, res) => {
  try {
    const gradient = new Gradient(req.body);
    const savedGradient = await gradient.save();
    res.status(201).json(savedGradient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/gradients/:id', async (req, res) => {
  try {
    await Gradient.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Gradient deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Palette routes
app.get('/api/palettes', async (req, res) => {
  try {
    const palettes = await Palette.find().sort({ createdAt: -1 });
    res.json(palettes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/palettes', async (req, res) => {
  try {
    const palette = new Palette(req.body);
    const savedPalette = await palette.save();
    res.status(201).json(savedPalette);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/palettes/:id', async (req, res) => {
  try {
    await Palette.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Palette deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 