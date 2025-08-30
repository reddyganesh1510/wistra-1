# Wistra Voice Chatbot

A full-stack voice chatbot using React, Node.js, OpenAI Whisper, GPT, and ElevenLabs TTS.

---

## Prerequisites

- Node.js 20+ (for backend)
- npm (comes with Node.js)
- OpenAI API key
- ElevenLabs API key

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/wistra.git
cd wistra
```

### 2. Backend Setup

```bash
cd wistra-backend
npm install
```

- Create a `.env` file in `wistra-backend` with your keys:

  ```
  OPENAI_API_KEY=your_openai_api_key
  ELEVENLABS_KEY=your_elevenlabs_api_key
  ```

- Create a `data` folder for chat history:

  ```bash
  mkdir data
  ```

- Start the backend server:

  ```bash
  node src/app.js
  ```

  The backend runs on `http://localhost:8000`.

---

### 3. Frontend Setup

```bash
cd ../wistra-frontend/my-app
npm install
```

- Start the React app:

  ```bash
  npm start
  ```

  The frontend runs on `http://localhost:3000`.

---

## Usage

1. Open `http://localhost:3000` in your browser.
2. Click the **Record** button to speak.
3. The app sends your audio to the backend, gets a chat response, and plays the reply as audio.

---

## Troubleshooting

- **CORS errors:** Make sure backend allows requests from frontend origin.
- **Audio format errors:** The backend only accepts supported formats (`wav`, `mp3`, etc.).
- **API keys:** Ensure your `.env` file is correct and not committed to git.

---
