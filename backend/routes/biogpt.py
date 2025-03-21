from fastapi import APIRouter, HTTPException
from backend.models.biogpt_model import BioGPTRequest, BioGPTResponse
from backend.services.biogpt_service import generate_biogpt_text

router = APIRouter()

@router.post("/biogpt", response_model=BioGPTResponse)
async def biogpt_generate(request: BioGPTRequest):
    """AI-powered drug interaction research using BioGPT."""
    response_text = generate_biogpt_text(request.query)
    
    if not response_text:
        raise HTTPException(status_code=500, detail="BioGPT failed to generate a response.")
    
    return {"input": request.query, "generated_response": response_text}

