# 🎤 Let Me Ask AI

> Transcribe video's audios and answer questions about it using AI

Application that allows you to upload audio files, transcribe them using Google's Gemini AI, and ask questions about the content. The system uses vector embeddings for semantic search to provide accurate answers based on the transcribed content.

## ✨ Features

- 🎵 **Audio Transcription**: Upload audio files and get accurate transcriptions using Gemini AI
- 🤖 **AI-Powered Q&A**: Ask questions about your audio content and get intelligent answers
- 🔍 **Semantic Search**: Uses vector embeddings for context-aware question answering
- 📁 **Room Management**: Organize your audio files and questions in separate rooms
- 🚀 **Fast API**: Built with Fastify for high-performance REST API
- 🗄️ **Vector Database**: PostgreSQL with pgvector extension for efficient similarity search
- 🔒 **Type Safety**: Full TypeScript support with Zod validation

## 🛠️ Tech Stack

- **Backend**: Node.js with TypeScript
- **Framework**: Fastify
- **Database**: PostgreSQL with pgvector extension
- **ORM**: Drizzle ORM
- **AI Services**: Google Gemini AI (transcription & embeddings)
- **Validation**: Zod
- **Code Quality**: Biome
- **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- Docker and Docker Compose
- Google Gemini API key

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5432/letmeask-db
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note**: Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### 4. Start the Database with Docker

```bash
docker-compose up -d
```

This will start a PostgreSQL database with the pgvector extension on port 5432.

### 5. Run Database Migrations

```bash
npm run db:migrate
```

### 6. Seed the Database (Optional)

To populate the database with sample data:

```bash
npm run db:seed
```

### 7. Start the Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3333`

## 📚 API Endpoints

### Health Check
- `GET /health` - Check if the server is running

### Rooms
- `GET /rooms` - List all rooms
- `POST /rooms` - Create a new room

### Questions
- `GET /rooms/:roomId/questions` - Get questions for a specific room
- `POST /rooms/:roomId/questions` - Create a new question in a room

### Audio Upload
- `POST /rooms/:roomId/audio` - Upload and transcribe audio file

## 🗄️ Database Schema

The application uses three main tables:

- **`rooms`**: Stores room information (name, description)
- **`questions`**: Stores questions and their AI-generated answers
- **`audio_chunks`**: Stores transcribed audio chunks with vector embeddings

## 🔧 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot reload
- `npm run db:generate` - Generate new database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed the database with sample data

## 🐳 Docker Usage

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

## 🔍 How It Works

1. **Audio Upload**: Users upload audio files to specific rooms
2. **Transcription**: Gemini AI transcribes the audio to text
3. **Chunking**: The transcription is split into manageable chunks
4. **Embeddings**: Each chunk is converted to vector embeddings using Gemini
5. **Storage**: Chunks and embeddings are stored in PostgreSQL with pgvector
6. **Q&A**: When users ask questions, the system:
   - Converts the question to embeddings
   - Finds the most similar chunks using vector similarity
   - Uses Gemini AI to generate answers based on the relevant context

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

