# Chambot: Personal Job Search Assistant

Chambot is a personal job search assistant designed to help you streamline your global job hunt. It features AI-powered resume tailoring, cover letter generation, and automated job searching.

## Project Structure

- `/frontend`: React.js with Vite and Material-UI.
- `/backend`: Node.js with Express, MongoDB (optional), and Grok (xAI) integration.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm run install-all
    ```

2.  **Environment Variables**:
    Create a `backend/.env` file and add your API keys:
    - `GROQ_API_KEY`: Your xAI/Grok API key.
    - `OPENAI_API_KEY`: Your OpenAI API key (optional).
    - `MONGODB_URI`: Your MongoDB connection string.

3.  **Run the Application**:
    ```bash
    npm run dev
    ```

## Preview Options

### 1. Local (Standard)
Access the application at [http://localhost:3000](http://localhost:3000).

### 2. Local Network (Other Devices)
If you want to access the app from another device (like your phone) on the same Wi-Fi network:
- Open [http://192.168.0.16:3000](http://192.168.0.16:3000) (or your computer's local IP).
- *Note: Ensure your firewall allows traffic on port 3000.*

### 3. Public Tunnel (Temporary)
To get a temporary public URL that works anywhere, you can use `localtunnel`:
1. Install it globally: `npm install -g localtunnel`
2. Run it: `lt --port 3000`
3. Share the URL provided (e.g., `https://chambot-test.loca.lt`).

### 4. Cloud Deployment Guide (Recommended)
To have your Chambot assistant running 24/7 in the cloud, follow these steps:

#### 1. Database (MongoDB Atlas)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Cluster and get your **Connection String**.
3. In the "Network Access" tab, allow access from `0.0.0.0/0` (or the IP of your hosting provider).

#### 2. Backend (Render.com)
1. Sign up at [Render](https://render.com/).
2. Create a new **Web Service** and connect your GitHub repo.
3. Set **Root Directory** to `backend`.
4. **Build Command**: `npm install`
5. **Start Command**: `node src/server.js`
6. **Environment Variables**:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `GROQ_API_KEY`: Your Grok API key.
   - `PORT`: `5000`

#### 3. Frontend (Vercel)
1. Sign up at [Vercel](https://vercel.com/).
2. Import your GitHub repo.
3. Set **Root Directory** to `frontend`.
4. **Framework Preset**: `Vite`
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist`
7. **Environment Variables**:
   - `VITE_API_URL`: The URL of your Render backend (e.g., `https://chambot-backend.onrender.com/api`).
