from fastapi import FastAPI
from app.routes import biogpt

app = FastAPI(
    title="VirtualCure AI Drug Research API",
    version="1.0",
    description="Accelerating drug research with AI-driven simulations using BioGPT."
)

# Include BioGPT routes
app.include_router(biogpt.router, prefix="/api", tags=["BioGPT"])

@app.get("/")
async def root():
    return {"message": "Welcome to VirtualCure AI Drug Research API!"}

