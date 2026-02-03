from fastapi import FastAPI
from pydantic import BaseModel
import logging
import json
import faiss
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer
import os
from api.generator import GeminiGenerator
from api.retriever import Retriever

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="WealthWise AI-Powered Semantic Search Backend",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Globals initialized at startup
embedding_model = None
faiss_index = None
metadata = None
retriever = None
generator = None


class QueryRequest(BaseModel):
    query: str
    top_k: int = 5


@app.on_event("startup")
def startup_event():
    global embedding_model, faiss_index, metadata, retriever, generator

    logger.info("Starting Semantic Search Backend...")

    # Load embedding model
    logger.info("Loading embedding model (MiniLM)...")
    embedding_model = SentenceTransformer(
        "sentence-transformers/all-MiniLM-L6-v2"
    )
    embedding_dim = embedding_model.get_sentence_embedding_dimension()
    logger.info(f"Embedding model loaded (dim={embedding_dim})")

    # Load FAISS index
    index_path = Path(__file__).resolve().parents[1] / "embeddings" / "faiss.index"
    logger.info(f"Loading FAISS index from {index_path}...")
    faiss_index = faiss.read_index(str(index_path))

    if faiss_index.d != embedding_dim:
        raise ValueError(
            f"FAISS dim={faiss_index.d} does not match model dim={embedding_dim}"
        )
    logger.info("FAISS index loaded and validated.")

    # Load metadata
    metadata_path = Path(__file__).resolve().parents[1] / "embeddings" / "metadata.json"
    logger.info(f"Loading metadata from {metadata_path}...")
    with open(metadata_path, "r", encoding="utf-8") as f:
        metadata = json.load(f)
    logger.info(f"Metadata loaded ({len(metadata)} entries).")

    # Initialize retriever
    retriever = Retriever(
        embedding_model=embedding_model,
        faiss_index=faiss_index,
        metadata=metadata
    )
    logger.info("Retriever initialized.")

    #API key setup
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY not set")

    generator = GeminiGenerator(api_key=api_key)
    logger.info("Gemini generator initialized.")


    logger.info("Startup complete. Application is ready.")


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "embedding_model_loaded": embedding_model is not None,
        "faiss_loaded": faiss_index is not None,
        "metadata_loaded": metadata is not None,
        "retriever_ready": retriever is not None
    }


@app.post("/query")
def query_docs(request: QueryRequest):
    retrieved_chunks = retriever.retrieve(
        query=request.query,
        top_k=request.top_k
    )

    generation = generator.generate_answer(
        query=request.query,
        retrieved_chunks=retrieved_chunks
    )

    return {
        "query": request.query,
        "answer": generation["answer"],
        "citations": generation["citations"],
        "sources": retrieved_chunks
    }

