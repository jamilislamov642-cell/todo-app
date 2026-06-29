# 📝 Todo App - Full Stack

A modern, secure, full-stack todo application with user authentication, built with **FastAPI** backend and **React** frontend.

## 🚀 Features

- ✅ User registration and login with JWT authentication
- ✅ Secure password hashing with bcrypt
- ✅ Create, read, update, and delete todos
- ✅ Responsive modern UI
- ✅ Real-time task management
- ✅ Environment-based configuration
- ✅ Docker support for easy deployment

## 📋 Tech Stack

- **Backend:** FastAPI, SQLAlchemy, PostgreSQL/SQLite
- **Frontend:** React, Axios, CSS3
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcrypt password hashing, CORS
- **Deployment:** Docker

## 🛠️ Setup & Installation

### Prerequisites
- Python 3.9+
- Node.js 14+
- PostgreSQL (or SQLite for development)

### Backend Setup

```bash
# Clone the repo
git clone https://github.com/jamilislamov642-cell/todo-app.git
cd todo-app/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Run migrations
python -c "from database import Base, engine; Base.metadata.create_all(bind=engine)"

# Start server
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm start
```

The app will open at `http://localhost:3000`

## 🔒 Security Features

- JWT token-based authentication
- Secure password hashing (bcrypt)
- CORS protection
- Environment variables for sensitive data
- No plaintext password transmission

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Todos
- `GET /api/todos` - Get all user todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/{id}` - Update todo
- `DELETE /api/todos/{id}` - Delete todo

## 🐳 Docker Deployment

```bash
docker-compose up --build
```

Backend: `http://localhost:8000`
Frontend: `http://localhost:3000`

## 📝 Environment Variables

See `.env.example` for required variables.

## 🤝 Contributing

Feel free to fork and submit pull requests!

## 📄 License

MIT License
