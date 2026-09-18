"""
Cooperative Sahayak - FastAPI Reference Backend
"""
import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="Cooperative Sahayak Backend API",
    description="Multilingual voice-based assistance API for cooperative society members and farmers",
    version="1.0.0"
)

class QueryRequest(BaseModel):
    query: str
    language: str = "en-IN"

class QueryResponse(BaseModel):
    success: bool
    query: str
    language: str
    sources: List[dict]
    answer: str

class TTSRequest(BaseModel):
    text: str
    language: str = "en-IN"

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "Cooperative Sahayak API", "version": "1.0.0"}

@app.post("/api/speech-to-text")
async def speech_to_text(
    audio: UploadFile = File(...),
    language: str = Form("en-IN")
):
    sarvam_api_key = os.getenv("SARVAM_API_KEY", "")
    # Transcribes audio via Sarvam AI API
    return {
        "success": True,
        "language": language,
        "transcript": "Transcribed text using Sarvam Saaras model"
    }

@app.post("/api/query", response_model=QueryResponse)
def query_knowledge(req: QueryRequest):
    return {
        "success": True,
        "query": req.query,
        "language": req.language,
        "sources": [{"title": "PMFBY Guidelines", "category": "Agriculture", "source": "Ministry of Agriculture"}],
        "answer": "Grounded answer strictly based on retrieved cooperative knowledge base."
    }

@app.post("/api/text-to-speech")
def text_to_speech(req: TTSRequest):
    return {
        "success": True,
        "language": req.language,
        "audio_url": "Generated speech audio from Sarvam Bulbul model"
    }
