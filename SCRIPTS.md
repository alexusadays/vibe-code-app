# Project Scripts Reference

## Quick Start

### Local Development
```bash
npm start                    # Run backend + frontend locally
npm run dev:backend          # Run backend only
npm run dev:frontend         # Run frontend only
```

### Docker Development
```bash
npm run start:docker         # Start all services in Docker
npm run stop:docker          # Stop all services
npm run logs:docker          # View all logs
npm run ps:docker            # List running containers
```

## All Available Scripts

### Development Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `npm run dev:backend` | Start backend with hot reload | Local development |
| `npm run dev:frontend` | Start frontend with hot reload | Local development |
| `npm start` | Start both services locally | Local full-stack dev |

**Requirements:**
- Backend: Python venv activated
- Frontend: Node.js installed
- Ports 8000 (backend) and 3000 (frontend) available

### Docker Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `npm run start:docker` | Start containers (build if needed) | Docker environment |
| `npm run stop:docker` | Stop and remove containers | Clean shutdown |
| `npm run logs:docker` | View all logs (follow mode) | Debugging |
| `npm run logs:backend` | View backend logs only | Backend debugging |
| `npm run logs:frontend` | View frontend logs only | Frontend debugging |
| `npm run restart:docker` | Restart all containers | Apply changes |
| `npm run rebuild:docker` | Force rebuild containers | Major updates |
| `npm run ps:docker` | List running containers | Status check |

**URLs (Docker):**
- Backend: http://localhost:8000
- Frontend: http://localhost:3000
- API Docs: http://localhost:8000/docs

### Testing Scripts (Module 6+)

| Script | Description | Usage |
|--------|-------------|-------|
| `npm run test:e2e` | Run Playwright tests locally | Local testing |
| `npm run test:e2e:docker` | Run tests in container | CI/CD simulation |
| `npm run test:e2e:ui` | Open Playwright UI | Test development |
| `npm run test:e2e:headed` | Run with visible browser | Debugging |
| `npm run test:e2e:debug` | Debug tests | Troubleshooting |
| `npm run report:open` | View test report | After test run |

**Note:** Playwright scripts require Module 6 completion

### Maintenance Scripts

| Script | Description | Warning |
|--------|-------------|---------|
| `npm run clean` | Remove node_modules and caches | Requires reinstall |
| `npm run clean:docker` | Remove all Docker resources | Deletes volumes |
| `npm run install:all` | Install all dependencies | Safe to run |
| `npm run health:backend` | Check backend health | Requires running backend |
| `npm run health:frontend` | Check frontend health | Requires running frontend |

## Common Workflows

### First Time Setup
```bash
npm run install:all          # Install dependencies
npm start                    # Start local development
# OR
npm run start:docker         # Start Docker environment
```

### Daily Development (Local)
```bash
npm start                    # Start both services
# Make changes, see live updates
# Ctrl+C to stop
```

### Daily Development (Docker)
```bash
npm run start:docker         # Start containers
npm run logs:docker          # Watch logs (optional)
# Make changes
npm run rebuild:docker       # Rebuild if needed
npm run stop:docker          # Stop when done
```

### Testing Workflow (Module 6+)
```bash
npm run start:docker         # Start services
npm run test:e2e:docker      # Run tests
npm run report:open          # View results
npm run stop:docker          # Clean up
```

### Troubleshooting Workflow
```bash
npm run ps:docker            # Check container status
npm run logs:backend         # Check backend logs
npm run logs:frontend        # Check frontend logs
npm run health:backend       # Test backend health
npm run health:frontend      # Test frontend health
npm run rebuild:docker       # Force rebuild if needed
```

### Clean Slate
```bash
npm run stop:docker          # Stop containers
npm run clean:docker         # Remove everything
npm run clean                # Clean local files
npm run install:all          # Reinstall dependencies
npm run start:docker         # Start fresh
```

## Tips

- **Local vs Docker:** Use local for faster development, Docker for testing
- **Logs:** Use `Ctrl+C` to stop following logs (doesn't stop containers)
- **Ports:** Ensure ports are available before starting services
- **Venv:** Backend requires Python virtual environment activated for local dev
- **Rebuild:** Use `rebuild:docker` after major changes (Dockerfile, dependencies)
- **Health Checks:** Always verify health after starting services

## Keyboard Shortcuts

- `Ctrl+C` - Stop running command (or stop following logs)
- `Ctrl+Shift+C` - Copy from terminal
- `Ctrl+Shift+V` - Paste to terminal

## Environment Files

Local development uses:
- Backend: No .env needed (defaults work)
- Frontend: `.env.local` with `VITE_API_URL=http://localhost:8000`

Docker uses:
- Backend: Environment from docker-compose.yml
- Frontend: `.env.docker` with `VITE_API_URL=` (empty, nginx proxy)

## Common Issues

**"Port already in use"**
```bash
npm run stop:docker          # Stop Docker services
# Or kill local process using the port
```

**"Backend not running" error**
```bash
# Check if venv is activated (local)
cd backend
.\venv\Scripts\activate
cd ..
npm run dev:backend

# Or check Docker logs
npm run logs:backend
```

**"Module not found" error**
```bash
npm run clean
npm run install:all
```

**Docker build fails**
```bash
npm run clean:docker
npm run start:docker
```

## PowerShell vs Bash

These scripts work in both PowerShell and Bash.

PowerShell alternatives for health checks:
```powershell
# Instead of npm run health:backend
Invoke-RestMethod -Uri http://localhost:8000/api/health

# Instead of npm run health:frontend
Invoke-RestMethod -Uri http://localhost:3000/health
```
