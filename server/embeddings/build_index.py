import json
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
from pathlib import Path

# -------------------------
# Paths
# -------------------------
BASE_DIR = Path(__file__).resolve().parent
CHUNKS_PATH = BASE_DIR.parent / "data" / "processed" / "chunks.json"
FAISS_INDEX_PATH = BASE_DIR / "faiss.index"
METADATA_PATH = BASE_DIR / "metadata.json"

# -------------------------
# Load chunks
# -------------------------
with open(CHUNKS_PATH, "r", encoding="utf-8") as f:
    chunks = json.load(f)

texts = [chunk["text"] for chunk in chunks]

# -------------------------
# Load embedding model
# -------------------------
print("🔹 Loading embedding model...")
model = SentenceTransformer("all-MiniLM-L6-v2")

# -------------------------
# Generate embeddings
# -------------------------
print("🔹 Generating embeddings...")
embeddings = model.encode(
    texts,
    batch_size=32,
    show_progress_bar=True
)

embeddings = np.array(embeddings).astype("float32")

# -------------------------
# Create FAISS index
# -------------------------
dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(embeddings)

# -------------------------
# Save index + metadata
# -------------------------
faiss.write_index(index, str(FAISS_INDEX_PATH))

with open(METADATA_PATH, "w", encoding="utf-8") as f:
    json.dump(chunks, f, indent=2)

print(f"✅ FAISS index created with {index.ntotal} vectors")
