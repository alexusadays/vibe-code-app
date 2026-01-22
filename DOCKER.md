# Docker Guide

## Quick Commands

### Start Services
```bash
docker compose up -d --build
npm run start:docker
```

### View Logs
```bash
docker compose logs -f
docker compose logs -f backend
docker compose logs -f frontend
npm run logs:docker
```

### Stop Services
```bash
docker compose down
npm run stop:docker
```

### Rebuild Services
```bash
docker compose up -d --build --force-recreate
npm run rebuild:docker
```

### Remove Everything
```bash
docker compose down -v  # Including volumes
docker system prune -a  # Clean all Docker resources
```

## Service URLs

- Backend API: http://localhost:8000
- Backend Docs: http://localhost:8000/docs
- Frontend: http://localhost:3000

## Architecture

The frontend uses nginx as a reverse proxy:
- Browser requests go to http://localhost:3000
- Frontend JavaScript makes requests to /api/* (relative URLs)
- Nginx proxies /api/* to http://backend:8000
- Backend processes requests and returns responses

This approach:
- Avoids CORS issues (same origin)
- Keeps backend hostname internal to Docker network
- Works in both Docker and production environments

## Troubleshooting

### Services won't start
```bash
docker compose down
docker system prune -f
docker compose up -d --build
```

### View container details
```bash
docker compose ps
docker compose exec backend env
docker compose exec frontend env
```

### Execute commands in containers
```bash
docker compose exec backend bash
docker compose exec frontend sh
```

### Check health
```bash
docker compose exec backend curl http://localhost:8000/api/health
docker compose exec frontend wget -O- http://localhost:3000/health
```

### Frontend can't reach backend
This should be fixed by the nginx proxy configuration.
If issues persist:
1. Check nginx.conf has the /api/ location block
2. Verify .env.docker has VITE_API_URL= (empty)
3. Rebuild frontend: docker compose build --no-cache frontend
4. Check browser Network tab for request URLs

## Network Debugging

```bash
# List networks
docker network ls

# Inspect network
docker network inspect vibe-network

# Test connectivity
docker compose exec frontend wget -O- http://backend:8000/api/health
docker compose exec backend curl http://frontend:3000/health
```
