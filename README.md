#  Gully

Gully is a cricket-focused web application designed to bring cricket fans together. It provides match information, statistics, team details, and real-time chat rooms where users can discuss ongoing matches.

The application combines REST APIs and WebSockets to provide both traditional data fetching and real-time communication.


##  Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios

### Backend
- Node.js
- Express.js
- WebSockets (`ws`)
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

##  Architecture

Gully uses two communication mechanisms:

**REST API**
- Fetches match information.
- Retrieves player statistics and team details.
- Handles user authentication.
- Retrieves previously stored chat messages.

**WebSockets**
- Maintains persistent connections between clients and the server.
- Organizes users into match-specific chat rooms.
- Broadcasts messages to connected users in the same room.

### Chat workflow

1. A user connects to the WebSocket server.
2. The user joins a particular match room.
3. The user sends a message.
4. The backend stores the message in MongoDB.
5. The backend broadcasts the message to users in that room.
6. Connected clients receive the message and update their UI in real time.

##  Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm

### Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd Gully
```

### Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PASSWORD = something_for_encryption
REDIS_URL = URL_of_Redis
CRICKET_API = https://cricketdatabase.com/ - login_and_get_your_api_key
```

Start the backend:

```bash
npm run dev
```

### Frontend setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL provided by Vite in your browser.

##  Project Structure

```text
Gully/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── slice/
│   │   ├── store/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
│   └── package.json
│
└── README.md
```

*Adjust the folder structure above to match your actual repository.*

##  Project Goal

The goal of Gully is to create an interactive cricket platform where fans can follow matches, explore cricket statistics, and connect with other cricket enthusiasts through real-time conversations.

##  Developer

Developed as a personal full-stack web development project to explore backend development, real-time communication, database integration, and modern frontend technologies.
