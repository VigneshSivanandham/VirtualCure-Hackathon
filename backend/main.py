from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from openai import OpenAI
from dotenv import load_dotenv
from services.biogpt_service import BioGPTModel
from routes import simulations

load_dotenv()

# Set Groq API key
GROQ_API_KEY = "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"
MODEL_NAME = "deepseek-r1-distill-llama-70b"  
biogpt_model = BioGPTModel()


app = FastAPI(title="Virtual Cure API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Groq client with correct base URL and API version
client = OpenAI(
    api_key=GROQ_API_KEY,
    base_url="https://api.groq.com/openai/v1"
)

# Pydantic models
class Patient(BaseModel):
    id: Optional[int] = None
    name: str
    age: int
    symptoms: List[str]
    medical_history: Optional[str] = None

class DiagnosisResponse(BaseModel):
    diagnosis: str
    confidence: float
    recommendations: List[str]

class DrugSimulation(BaseModel):
    patient_id: int
    drug_name: str
    dosage: float
    frequency: str

@app.get("/")
async def root():
    return {"message": "Welcome to Virtual Cure API"}

@app.post("/diagnose", response_model=DiagnosisResponse)
async def diagnose_patient(patient: Patient):
    try:
        # Prepare prompt for Groq model
        prompt = f"""As an AI medical diagnosis system, analyze the following patient information and provide a detailed diagnosis:

Patient Information:
- Name: {patient.name}
- Age: {patient.age}
- Symptoms: {', '.join(patient.symptoms)}
{f'- Medical History: {patient.medical_history}' if patient.medical_history else ''}

Please provide:
1. A detailed initial diagnosis based on the symptoms
2. A confidence level (as a decimal between 0 and 1)
3. A list of medical recommendations

Format your response in this exact structure:
DIAGNOSIS: [Your detailed diagnosis here]
CONFIDENCE: [0.XX]
RECOMMENDATIONS:
- [First recommendation]
- [Second recommendation]
- [Additional recommendations...]"""

        # Call Groq API
        completion = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": "You are a highly skilled medical AI assistant, trained to provide initial medical assessments based on patient symptoms."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=1000
        )

        # Extract response
        response_text = completion.choices[0].message.content

        # Parse the response
        sections = response_text.split('\n')
        diagnosis = ""
        confidence = 0.85  # Default confidence
        recommendations = []

        for section in sections:
            if section.startswith("DIAGNOSIS:"):
                diagnosis = section.replace("DIAGNOSIS:", "").strip()
            elif section.startswith("CONFIDENCE:"):
                try:
                    confidence = float(section.replace("CONFIDENCE:", "").strip())
                except:
                    confidence = 0.85
            elif section.startswith("-"):
                recommendations.append(section.replace("-", "").strip())

        # If recommendations list is empty, check if there's a RECOMMENDATIONS section
        if not recommendations:
            rec_start = response_text.find("RECOMMENDATIONS:")
            if rec_start != -1:
                rec_text = response_text[rec_start:].split('\n')[1:]
                recommendations = [r.replace("-", "").strip() for r in rec_text if r.strip() and r.strip().startswith("-")]

        # Ensure we have at least one recommendation
        if not recommendations:
            recommendations = ["Consult with a healthcare professional for a complete evaluation"]

        return DiagnosisResponse(
            diagnosis=diagnosis or "Based on the symptoms, a preliminary assessment suggests further medical evaluation is needed.",
            confidence=confidence,
            recommendations=recommendations
        )

    except Exception as e:
        print(f"Error in diagnosis: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Drug Simulation Endpoint
app.include_router(simulations.router)

@app.post("/drug-simulation")
async def simulate_drug_interaction(simulation: DrugSimulation):
    """
    This endpoint takes drug details and calls BioGPT to generate an AI-powered drug interaction analysis.
    """
    try:
        # Prepare prompt for BioGPT
        prompt = f"""Analyze drug interaction for:
        Drug: {simulation.drug_name}
        Dosage: {simulation.dosage}mg
        Frequency: {simulation.frequency}
        
        Consider patient profile and provide:
        1. Expected effectiveness
        2. Potential side effects
        3. Drug interactions
        4. Recommendations"""

        # Call BioGPT for response
        response = biogpt_model.generate_response(prompt)

        return {
            "effectiveness": response.get("effectiveness", "Unknown"),
            "side_effects": response.get("side_effects", ["Not listed"]),
            "interactions": response.get("interactions", ["None detected"]),
            "recommendations": response.get("recommendations", ["Consult your doctor before use"])
        }
    
    except Exception as e:
        return {"error": str(e)}
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

