from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os

from .database import init_db, get_random_response, get_next_response
from .models import HealthResponse, TextResponse, ErrorResponse


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan event handler - runs on startup and shutdown."""
    # Startup
    print("Starting application...")
    init_db()
    print("Application started successfully")
    yield
    # Shutdown
    print("Shutting down application...")


# Create FastAPI app
app = FastAPI(
    title="Vibe Code API",
    description="Backend API for automation testing demo",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Root"])
async def root():
    """Root endpoint."""
    return {
        "message": "Welcome to Vibe Code API",
        "docs": "/docs",
        "health": "/api/health"
    }


@app.get("/api/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """
    Health check endpoint.
    Returns the current status of the API.
    """
    return HealthResponse(
        status="ok",
        message="API is running"
    )


@app.get("/api/random", response_model=TextResponse, tags=["Responses"])
async def get_random():
    """
    Get a random response from the database.
    Returns a randomly selected text response.
    """
    try:
        text = get_random_response()
        return TextResponse(text=text)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch random response: {str(e)}"
        )


@app.get("/api/list/next", response_model=TextResponse, tags=["Responses"])
async def get_next():
    """
    Get the next response in sequence.
    Returns responses in order with automatic rotation.
    """
    try:
        text = get_next_response()
        return TextResponse(text=text)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch next response: {str(e)}"
        )
