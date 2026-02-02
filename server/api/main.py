from fastapi import FastAPI
import logging

# Configure basic logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI (
  title = "WealthWise - AI powered semantic search backend",
  description="FastAPI backend for RAG-based personal finance learning",
  version="0.1.0"
)

@app.on_event("startup")
def startup_event():
    logger.info("Starting Semantic Search Backend...")
    # Placeholder for future:
    # - Load embedding model
    # - Load FAISS index
    logger.info("Startup complete.")

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "semantic-search-backend"
    }
