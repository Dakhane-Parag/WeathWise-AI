from fastapi import FastAPI
import logging
import json
import faiss
from pathlib import Path
from sentence_transformers import SentenceTransformer

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="AI-Powered Semantic Search Backend",
    version="0.1.0"
)

# Global, read-only references
embedding_model = None
faiss_index = None
metadata = None

@app.on_event("startup")
def startup_event():
    global embedding_model, faiss_index, metadata

    logger.info("Starting Semantic Search Backend...")

    # 1️⃣ Load embedding model
    logger.info("Loading embedding model (MiniLM)...")
    embedding_model = SentenceTransformer(
        "sentence-transformers/all-MiniLM-L6-v2"
    )
    embedding_dim = embedding_model.get_sentence_embedding_dimension()
    logger.info(f"Embedding model loaded (dim={embedding_dim})")

    # 2️⃣ Load FAISS index
    index_path = Path(__file__).resolve().parents[1] / "embeddings" / "faiss.index"
    logger.info(f"Loading FAISS index from {index_path}...")
    faiss_index = faiss.read_index(str(index_path))
    logger.info("FAISS index loaded successfully.")

    # 3️⃣ Validate dimensions
    if faiss_index.d != embedding_dim:
        raise ValueError(
            f"Embedding dimension mismatch: "
            f"FAISS index dim={faiss_index.d}, "
            f"model dim={embedding_dim}"
        )

    logger.info("FAISS index dimension validated.")

    # 4️⃣ Load metadata
    metadata_path = Path(__file__).resolve().parents[1] / "embeddings" / "metadata.json"
    logger.info(f"Loading metadata from {metadata_path}...")
    with open(metadata_path, "r", encoding="utf-8") as f:
        metadata = json.load(f)

    logger.info(f"Metadata loaded ({len(metadata)} entries).")
    logger.info("Startup complete. Application is ready.")

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "embedding_model_loaded": embedding_model is not None,
        "faiss_loaded": faiss_index is not None,
        "metadata_loaded": metadata is not None
    }
