# Quick Reference Card

## 🚀 Start Development

**Local:**
```bash
npm start
```

**Docker:**
```bash
npm run start:docker
```

## 🔍 Check Status

```bash
npm run ps:docker              # Container status
npm run health:backend         # Backend health
npm run health:frontend        # Frontend health
```

## 📊 View Logs

```bash
npm run logs:docker            # All logs
npm run logs:backend           # Backend only
npm run logs:frontend          # Frontend only
```

## 🛑 Stop Services

```bash
npm run stop:docker            # Stop Docker
# Ctrl+C for local dev
```

## 🔄 Restart/Rebuild

```bash
npm run restart:docker         # Quick restart
npm run rebuild:docker         # Force rebuild
```

## 🧪 Testing (Module 6+)

```bash
npm run test:e2e              # Local tests
npm run test:e2e:docker       # Docker tests
npm run report:open           # View report
```

## 🧹 Clean Up

```bash
npm run clean                 # Clean local files
npm run clean:docker          # Clean Docker
npm run install:all           # Reinstall
```

## 🌐 URLs

- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Frontend (Local): http://localhost:3000
- Frontend (Docker): http://localhost:3000

## 💡 Tips

- Use `logs:docker` to debug
- Use `rebuild:docker` after big changes
- Backend needs venv activated for local dev
- Frontend uses port 3000 for both local and Docker (consistent)
