# Vibe Code App

> Full-stack automation testing demo with Playwright CI/CD gate

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 Project Overview

A production-ready application demonstrating modern CI/CD practices with end-to-end testing:

- **Backend**: Python FastAPI + SQLite
- **Frontend**: React + Vite
- **E2E Testing**: Playwright (local, Docker, CI)
- **CI/CD**: GitHub Actions with automated test gates
- **Containerization**: Docker Compose orchestration

## 📋 Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Python** 3.9+ ([Download](https://www.python.org/downloads/))
- **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop/))
- **Git** ([Download](https://git-scm.com/downloads))

## 🚀 Quick Start

### Option 1: Local Development (Recommended for Development)

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd app

# 2. Start Backend
cd backend
python -m venv venv

# Activate virtual environment:
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Backend now running at http://localhost:8000
# API docs available at http://localhost:8000/docs

# 3. Start Frontend (in a new terminal)
cd frontend
npm install
npm run dev

# Frontend now running at http://localhost:5173
```

### Option 2: Docker Compose (Full Stack)

```bash
# Start all services (backend + frontend)
npm run start:docker

# View logs
npm run logs:docker

# Stop all services
npm run stop:docker
```

**Note**: Frontend will be available at `http://localhost:3000` and backend at `http://localhost:8000`

## 🏗️ Project Structure

```
app/
├── backend/              # FastAPI Python backend
│   ├── app/
│   │   ├── main.py      # FastAPI application
│   │   ├── database.py  # SQLite database logic
│   │   └── models.py    # Pydantic models
│   ├── data/            # SQLite database storage
│   ├── Dockerfile       # Backend container config
│   └── requirements.txt # Python dependencies
│
├── frontend/            # React Vite frontend
│   ├── src/
│   │   ├── App.jsx     # Main application component
│   │   ├── App.css     # Application styles
│   │   └── main.jsx    # Entry point
│   ├── Dockerfile      # Frontend container config
│   ├── nginx.conf      # Production nginx config
│   └── package.json    # Node dependencies
│
├── playwright/          # E2E test suite (Module 6)
│   └── tests/          # Test files
│
├── .github/
│   └── workflows/
│       └── ci.yml      # GitHub Actions pipeline
│
├── docker-compose.yml  # Multi-container orchestration
├── package.json        # Root workspace scripts
└── README.md
```

## 📚 API Endpoints

### Backend API (http://localhost:8000)

| Method | Endpoint          | Description                        |
|--------|-------------------|------------------------------------|
| GET    | `/api/health`     | Health check - returns status      |
| GET    | `/api/random`     | Get random response from database  |
| GET    | `/api/list/next`  | Get next sequential response       |
| GET    | `/docs`           | Interactive API documentation      |

### Example Requests

```bash
# Health check
curl http://localhost:8000/api/health

# Get random response
curl http://localhost:8000/api/random

# Get next response (sequential with rotation)
curl http://localhost:8000/api/list/next
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri http://localhost:8000/api/health
Invoke-RestMethod -Uri http://localhost:8000/api/random
Invoke-RestMethod -Uri http://localhost:8000/api/list/next
```

## 🧪 Testing

### End-to-End Tests (Playwright) - Coming in Module 6

```bash
# Run tests locally against local dev servers
npm run test:e2e

# Run tests in Docker environment
npm run test:e2e:docker

# Open Playwright UI for debugging
npm run test:e2e:ui

# View test report
npm run report:open
```

### Manual Testing

1. **Backend**: Visit http://localhost:8000/docs for interactive API testing
2. **Frontend**: Open http://localhost:5173 and click the RANDOM/NEXT buttons
3. **Docker Stack**: Visit http://localhost:3000 after `npm run start:docker`

## 🔧 Available NPM Scripts

```bash
# Development
npm start              # Run backend + frontend locally with concurrently
npm run dev:backend    # Run backend only
npm run dev:frontend   # Run frontend only

# Docker
npm run start:docker   # Start backend + frontend in Docker
npm run stop:docker    # Stop all Docker containers
npm run logs:docker    # View Docker container logs

# Testing (Module 6+)
npm run test:e2e          # Run Playwright tests locally
npm run test:e2e:docker   # Run Playwright tests in Docker
npm run test:e2e:ui       # Open Playwright UI
npm run test:e2e:headed   # Run tests with visible browser
npm run report:open       # View Playwright HTML report

# Maintenance
npm run clean          # Remove node_modules and Python cache
npm run clean:docker   # Clean Docker resources
```

## 🐳 Docker Commands

```bash
# Build images
docker build -t vibe-backend ./backend
docker build -t vibe-frontend ./frontend

# Run containers individually
docker run -p 8000:8000 vibe-backend
docker run -p 3000:3000 vibe-frontend

# Docker Compose (recommended)
docker compose up -d --build        # Start all services
docker compose ps                   # List running services
docker compose logs -f backend      # Follow backend logs
docker compose logs -f frontend     # Follow frontend logs
docker compose down                 # Stop all services
docker compose down -v              # Stop and remove volumes
```

## 🌍 Environment Variables

### Backend (.env in backend/)
```env
DATABASE_URL=sqlite:///./data/app.db
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Frontend

**Local Development (.env.local):**
```env
VITE_API_URL=http://localhost:8000
```

**Docker (.env.docker):**
```env
VITE_API_URL=http://backend:8000
```

## 🚢 Deployment & CI/CD

### GitHub Actions Workflow

The project includes automated CI/CD with Playwright as a quality gate:

1. **Test Job**: Runs on every push/PR
   - Builds Docker containers
   - Starts backend + frontend services
   - Executes Playwright E2E tests
   - Uploads test reports as artifacts

2. **Deploy Job**: Only runs if tests pass
   - Blocked automatically if Playwright tests fail
   - Prevents broken code from reaching production

```bash
# Trigger CI/CD
git add .
git commit -m "feat: add new feature"
git push origin main

# GitHub Actions will automatically:
# 1. Run tests in containers
# 2. Block deploy if tests fail
# 3. Proceed with deploy if tests pass
```

## 🐛 Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <process-id> /F

# Mac/Linux
lsof -ti:8000 | xargs kill
```

**ModuleNotFoundError:**
```bash
# Ensure virtual environment is activated
cd backend
.\venv\Scripts\activate  # Windows
source venv/bin/activate # Mac/Linux
pip install -r requirements.txt
```

### Frontend Issues

**CORS errors:**
- Ensure backend is running
- Check backend CORS_ORIGINS includes `http://localhost:5173`
- Restart backend after changing CORS settings

**Environment variables not loading:**
- Restart dev server after creating/editing `.env` files
- Verify variable names start with `VITE_`
- Check `.env.local` exists in frontend directory

### Docker Issues

**Docker daemon not running:**
- Start Docker Desktop
- Wait for green indicator in system tray

**Build fails:**
- Check Dockerfile syntax
- Ensure all required files exist
- Try: `docker system prune -f` to clean up

**Can't connect to backend from frontend container:**
- Use `http://backend:8000` (service name, not localhost)
- Ensure both services in same docker-compose network
- Check with: `docker compose logs backend`

## 📖 Module Progress

- ✅ **Module 1**: Project Foundation & Structure
- ✅ **Module 2**: Backend Service (FastAPI + SQLite)
- ✅ **Module 3**: Frontend Service (React + Vite)
- ⏳ **Module 4**: Docker Compose Integration
- ⏳ **Module 5**: Root Orchestration Scripts
- ⏳ **Module 6**: Playwright Test Suite
- ⏳ **Module 7**: GitHub Actions CI/CD
- ⏳ **Module 8**: Documentation & Polish
- ⏳ **Module 9**: Verification & Testing

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development workflow and commit conventions.

## 📝 Git Log

To view project history:
```bash
git log --oneline
git log --graph --oneline --all
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🎓 Learning Objectives

This project demonstrates:
- ✅ RESTful API design with FastAPI
- ✅ React state management and hooks
- ✅ Environment-based configuration
- ✅ Docker containerization
- ✅ Multi-stage Docker builds
- ✅ Docker Compose orchestration
- ⏳ End-to-end testing with Playwright
- ⏳ CI/CD pipeline automation
- ⏳ Quality gates and deployment strategies

## 🔗 Useful Links

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Docker Documentation](https://docs.docker.com/)

---

**Status**: 🚧 In Active Development

**Current Phase**: Module 3 Complete - Frontend Implementation

For questions or issues, please open a GitHub issue or refer to the module guides in the project root.

```markdown
## 📚 Additional Documentation

- [SCRIPTS.md](SCRIPTS.md) - Complete scripts reference
- [QUICKREF.md](QUICKREF.md) - Quick reference card
- [DOCKER.md](DOCKER.md) - Docker usage guide
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
```