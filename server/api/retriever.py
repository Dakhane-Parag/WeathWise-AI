import numpy as np

class Retriever:
    def __init__(self, embedding_model, faiss_index, metadata):
        self.embedding_model = embedding_model
        self.faiss_index = faiss_index
        self.metadata = metadata

    def retrieve(self, query: str, top_k: int = 5):
        """
        Convert query to embedding, perform FAISS search,
        and return top-k relevant chunks with metadata.
        """

        #Embed query
        query_embedding = self.embedding_model.encode(
            query,
            convert_to_numpy=True,
            normalize_embeddings=True
        ).astype("float32")

        #FAISS search
        distances, indices = self.faiss_index.search(
            np.array([query_embedding]),
            top_k
        )

        #Collect results
        results = []
        for idx, score in zip(indices[0], distances[0]):
            if idx == -1:
                continue

            chunk = self.metadata[idx]
            meta = chunk.get("metadata", {})

            results.append({
                "id": chunk.get("id"),
                "text": chunk.get("text"),
                "pdf": meta.get("pdf"),
                "page": meta.get("page"),
                "score": float(score)
            })


        return results
