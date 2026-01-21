from pydantic import BaseModel
from typing import Optional


class HealthResponse(BaseModel):
    """Health check response model."""
    status: str
    message: Optional[str] = None


class TextResponse(BaseModel):
    """Generic text response model."""
    text: str


class ErrorResponse(BaseModel):
    """Error response model."""
    error: str
    detail: Optional[str] = None