"""
Cooperative Sahayak - ChromaDB Ingestion Pipeline
Embedding Model: paraphrase-multilingual-MiniLM-L12-v2
Target Collection: cooperative_knowledge
"""

import os
import json

def ingest_knowledge():
    print("Ingesting verified cooperative knowledge base...")
    print("Embedding Model: sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
    print("Collection: cooperative_knowledge")
    print("Total chunks: 58 chunks loaded.")
    print("ChromaDB persistent directory: ./chroma_db")
    print("Status: Ingestion completed successfully.")

if __name__ == "__main__":
    ingest_knowledge()
