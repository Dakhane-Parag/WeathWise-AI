import google.generativeai as genai


class GeminiGenerator:
    def __init__(self, api_key: str):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel( "models/gemini-2.5-flash")

    def generate_answer(self, query: str, retrieved_chunks: list):
       
        if not retrieved_chunks:
            return {
                "answer": "I don’t know based on the provided documents.",
                "citations": []
            }

        # Build sources text
        sources_text = ""
        citations = []

        for i, chunk in enumerate(retrieved_chunks, start=1):
            sources_text += (
                f"[{i}] (PDF: {chunk['pdf']}, Page: {chunk['page']})\n"
                f"{chunk['text']}\n\n"
            )
            citations.append({
                "pdf": chunk["pdf"],
                "page": chunk["page"]
            })

        prompt = f"""
You are a personal finance learning assistant.

Answer the question strictly using ONLY the sources provided below.
Do NOT use outside knowledge.
If the answer is not present in the sources, say:
"I don’t know based on the provided documents."

Question:
{query}

Sources:
{sources_text}

Answer:
"""

        response = self.model.generate_content(prompt)

        return {
            "answer": response.text.strip(),
            "citations": citations
        }
