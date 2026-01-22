# Claude Context Reminder - Vibe Code App

## Project Overview
This is a **full-stack E2E testing automation demo** showcasing production-ready CI/CD practices. The goal is to demonstrate automation skills with a complete testing pipeline from local development through Docker to CI/CD.

### Tech Stack
- **Backend**: Python FastAPI + SQLite
- **Frontend**: React + Vite
- **E2E Testing**: Playwright (local + Docker + CI)
- **CI/CD**: GitHub Actions with quality gates
- **Containerization**: Docker Compose
- **Orchestration**: Root package.json scripts

---

## Current Progress Status

### ✅ COMPLETED MODULES

#### Module 1: Project Foundation ✓
- Root directory structure created
- Git repository initialized
- Root `package.json` with orchestration scripts
- `.gitignore` configured
- `docker-compose.yml` skeleton created
- README.md created
- **Commit**: `20b14bf - chore: initial project structure and configuration`

#### Module 2: Backend Service ✓
- Python FastAPI backend complete
- SQLite database with seed data (8 responses)
- Three API endpoints implemented:
  - `GET /api/health` → Health check
  - `GET /api/random` → Random response
  - `GET /api/list/next` → Sequential response with rotation
- CORS middleware configured
- Docker support (Dockerfile + .dockerignore)
- FastAPI auto-documentation at `/docs`
- **Commit**: `4037d08 - feat: add FastAPI backend with SQLite database and API endpoints`

#### Module 3: Frontend Service ✓
- React app scaffolded with Vite
- Single-page UI with:
  - Readonly textarea (`data-testid="response-box"`)
  - Random button (`data-testid="btn-random"`)
  - Next button (`data-testid="btn-next"`)
- API integration with loading/error states
- Environment variable configuration (.env.local, .env.docker, .env.example)
- Multi-stage Docker build with nginx
- Responsive design with gradient styling
- **Commit**: `821bab8 - feat: add React frontend with Vite and Docker support`
- **Commit**: `6a76a72 - docs: update README with comprehensive setup instructions`

---

### 🚧 NEXT STEPS (Not Started)

#### Module 4: Docker Compose Test Environment
**Status**: Not started (docker-compose.yml exists but not fully tested)

**What needs to be done**:
- Test `docker compose up --build` with backend + frontend
- Verify services can communicate (frontend → backend)
- Test health checks work properly
- Ensure volumes persist data
- Test `docker compose down` cleanup

**Expected deliverable**: Full stack running in Docker with working service communication

---

#### Module 5: Root Orchestration Scripts
**Status**: Scripts exist in package.json but need testing

**Scripts to verify**:
```json
"dev:backend": "cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000",
"dev:frontend": "cd frontend && npm run dev",
"start": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
"start:docker": "docker compose up -d --build backend frontend",
"stop:docker": "docker compose down",
"test:e2e": "cd playwright && npx playwright test",
"test:e2e:docker": "docker compose run --rm playwright",
"report:open": "cd playwright && npx playwright show-report"
```

**What needs to be done**:
- Install `concurrently` dependency
- Test `npm start` for local parallel dev
- Test `npm run start:docker` for containerized dev
- Verify all scripts work as expected

---

#### Module 6: Playwright Test Suite
**Status**: Playwright directory exists but is empty (no tests written)

**What needs to be done**:
1. Initialize Playwright: `cd playwright && npm init playwright@latest`
2. Configure `playwright.config.ts`:
   - Read `BASE_URL` from environment
   - Set retries, timeout, HTML reporter
3. Create `tests/app.spec.ts` with tests:
   - Test 1: Page loads + textarea visible
   - Test 2: Click Random → textarea not empty
   - Test 3: Click Next twice → text changes
4. Create `.env.local` → `BASE_URL=http://localhost:5173`
5. Create `.env.docker` → `BASE_URL=http://frontend:3000`
6. Test locally against running dev server
7. Add Playwright service to docker-compose.yml
8. Test in Docker environment

**Critical**: Tests must use exact `data-testid` attributes:
- `response-box`
- `btn-random`
- `btn-next`

---

#### Module 7: GitHub Actions CI/CD Pipeline
**Status**: `.github/workflows/` directory exists but is empty

**What needs to be done**:
1. Create `.github/workflows/ci.yml`
2. Define test job:
   - Checkout code
   - `docker compose up -d --build backend frontend`
   - Wait for services to be healthy
   - `docker compose run --rm playwright`
   - Upload test report as artifact (on failure)
   - `docker compose down`
3. Define deploy job:
   - Add `needs: [test]` dependency
   - Placeholder deploy step
4. Push to GitHub and verify workflow runs
5. Test that Playwright failures block deploy

---

#### Module 8: Documentation & Polish
**Status**: README exists but may need updates after all modules complete

**What needs to be done**:
- Update README with complete instructions
- Add architecture diagram (optional)
- Add code comments for tricky logic
- Screenshot the UI
- Record demo GIF/video (optional)

---

#### Module 9: Verification & Testing
**What needs to be done**:
- Fresh clone test (new directory)
- Local dev test (`npm install && npm start`)
- Docker test (`npm run start:docker` → `npm run test:e2e:docker`)
- CI test (push to GitHub, verify green build)
- Failure test (break a test, verify CI fails)
- Clean up debug logs and unused code

---

## Project Structure (Current State)

```
app/
├── .github/workflows/          # Empty - needs CI/CD workflow
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py             # FastAPI app ✓
│   │   ├── database.py         # SQLite operations ✓
│   │   └── models.py           # Pydantic models ✓
│   ├── data/
│   │   └── app.db              # SQLite database (created on first run)
│   ├── venv/                   # Python virtual environment
│   ├── .dockerignore           ✓
│   ├── .env.example            ✓
│   ├── Dockerfile              ✓
│   └── requirements.txt        ✓
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.css             # Styled UI ✓
│   │   ├── App.jsx             # Main component ✓
│   │   ├── index.css           # Global styles ✓
│   │   └── main.jsx            # Entry point ✓
│   ├── .dockerignore           ✓
│   ├── .env.local              ✓ (VITE_API_URL=http://localhost:8000)
│   ├── .env.docker             ✓ (VITE_API_URL=http://backend:8000)
│   ├── .env.example            ✓
│   ├── Dockerfile              ✓ (multi-stage build)
│   ├── nginx.conf              ✓
│   ├── package.json            ✓
│   └── vite.config.js          ✓
├── playwright/
│   └── tests/                  # Empty - needs test files
├── node_modules/               ✓ (concurrently installed)
├── .gitignore                  ✓
├── docker-compose.yml          ✓ (exists, needs testing)
├── package.json                ✓ (orchestration scripts)
├── package-lock.json           ✓
├── plan.txt                    # Original master plan
├── Module 1.txt               # Module 1 guide (completed)
├── Module 2.txt               # Module 2 guide (completed)
├── Module 3.txt               # Module 3 guide (completed)
└── README.md                   ✓ (comprehensive setup guide)
```

---

## Key Environment Variables

### Backend (.env)
```
DATABASE_URL=sqlite:///./data/app.db
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:8000
```

### Frontend (.env.docker)
```
VITE_API_URL=http://backend:8000
```

### Playwright (.env.local)
```
BASE_URL=http://localhost:5173
```

### Playwright (.env.docker)
```
BASE_URL=http://frontend:3000
```

---

## Quick Command Reference

### Local Development
```bash
npm start                    # Run backend + frontend locally
npm run test:e2e             # Run Playwright tests locally (once implemented)
```

### Docker Development
```bash
npm run start:docker         # Start containerized backend + frontend
npm run test:e2e:docker      # Run Playwright in container (once implemented)
npm run stop:docker          # Stop all containers
npm run report:open          # View Playwright HTML report (once implemented)
```

### Manual Docker
```bash
docker compose up -d --build
docker compose run --rm playwright    # Once Playwright service configured
docker compose down
docker compose logs -f backend
```

---

## Testing Status

### Backend Testing
- ✅ Local server runs: `cd backend && uvicorn app.main:app --reload`
- ✅ Health endpoint works: `curl http://localhost:8000/api/health`
- ✅ Random endpoint works: `curl http://localhost:8000/api/random`
- ✅ Next endpoint works: `curl http://localhost:8000/api/list/next`
- ✅ Swagger docs accessible: `http://localhost:8000/docs`
- ✅ Docker image builds successfully
- ❓ Docker container runtime not fully tested

### Frontend Testing
- ✅ Local dev server runs: `cd frontend && npm run dev`
- ✅ UI loads at `http://localhost:5173`
- ✅ Buttons connect to backend when backend is running
- ✅ Environment variables load correctly
- ✅ Docker image builds successfully
- ❓ Docker container runtime not fully tested
- ❓ Frontend → Backend communication in Docker not tested

### Integration Testing
- ❌ Docker Compose full stack not tested
- ❌ Playwright tests not written
- ❌ CI/CD pipeline not created
- ❌ E2E automation not implemented

---

## Known Issues / Considerations

1. **Docker Compose**: docker-compose.yml exists but full stack integration not tested
2. **Playwright**: Directory structure exists but no tests written yet
3. **CI/CD**: Workflows directory exists but no pipeline configured
4. **Concurrently**: Installed in root but parallel dev mode not tested
5. **Service Communication**: Frontend → Backend in Docker needs verification

---

## Git Status

**Current Branch**: `main`
**Status**: Clean working directory
**Recent Commits**:
1. `6a76a72` - docs: update README with comprehensive setup instructions
2. `821bab8` - feat: add React frontend with Vite and Docker support
3. `4037d08` - feat: add FastAPI backend with SQLite database and API endpoints
4. `20b14bf` - chore: initial project structure and configuration

---

## Success Criteria (Overall Goal)

- [x] Local dev: `npm start` runs both services
- [ ] Docker: `npm run start:docker` starts env, all tests pass
- [ ] CI: Push to GitHub triggers workflow, all jobs green
- [ ] Gate works: Breaking a test blocks deploy job
- [ ] Documentation: Fresh clone → follow README → everything works
- [ ] Portfolio ready: Clean code, good README, impressive demo

---

## Immediate Next Action

**Recommended**: Start with **Module 4 - Docker Compose Test Environment**

This will verify that the backend and frontend containers can communicate properly before moving on to Playwright tests. Without this verification, the Playwright Docker tests won't work.

**Alternative**: If you want to test locally first, jump to **Module 6 - Playwright Test Suite** and write tests against the local dev environment (http://localhost:5173).

---

## Important Notes for Claude

1. **Backend runs on port 8000**, Frontend dev on 5173, Frontend Docker on 3000
2. **CORS is configured** for both localhost:5173 and localhost:3000
3. **test-ids are critical**: `response-box`, `btn-random`, `btn-next`
4. **Environment variables**: Frontend uses `VITE_` prefix, loaded via `import.meta.env`
5. **Docker networking**: Services use service names (e.g., `http://backend:8000`)
6. **Database location**: `backend/data/app.db` (persisted with volume)
7. **Multi-stage builds**: Frontend uses node builder → nginx server
8. **Health checks**: Backend has curl-based health check in docker-compose

---

## Module Reference Files

- `plan.txt` - Master checklist (original comprehensive plan)
- `Module 1.txt` - Foundation setup (COMPLETED)
- `Module 2.txt` - Backend service (COMPLETED)
- `Module 3.txt` - Frontend service (COMPLETED)
- **Module 4-9**: Not yet documented in separate files

---

*This context file was generated on 2026-01-21 to provide Claude with complete project understanding.*
