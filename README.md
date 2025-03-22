# Gradient & Color Palette Generator

A MERN stack web application for creating beautiful gradients and color palettes for your projects.

## Features

- **Gradient Generator**:
  - Create linear and radial gradients
  - Add multiple color stops
  - Adjust color positions and angles
  - Copy CSS code with one click
  - Save your favorite gradients

- **Color Palette Generator**:
  - Generate harmonious color palettes based on color theory
  - Choose from different palette types (analogous, monochromatic, triadic, complementary)
  - Customize the number of colors
  - Copy individual colors with one click
  - Save your favorite palettes

- **Saved Items**:
  - View all your saved gradients and palettes
  - Delete items you no longer need

## Tech Stack

- **Frontend**:
  - React (Vite)
  - React Router
  - Tailwind CSS
  - Axios

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - Mongoose

## Installation & Setup

### Prerequisites
- Node.js
- MongoDB

### Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd gradient-app
   ```

2. Install dependencies:
   ```
   npm install
   npm run install-server
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/gradient-app
   ```

4. Start the development server:
   ```
   npm start
   ```
   This will run both the client (on port 5173) and server (on port 5000).

## Usage

- Navigate to `http://localhost:5173` to access the application
- Create gradients and color palettes
- Save your favorite designs
- View and manage your saved items

## License

MIT
