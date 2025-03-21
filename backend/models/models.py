from pydantic import BaseModel, Field
from typing import List, Optional

class Patient(BaseModel):
    id: str
    name: str
    age: int
    gender: str
    medical_history: List[str] = []

class SimulationRequest(BaseModel):
    patient_id: str
    symptoms: List[str]
    requested_treatment: Optional[str] = None

class SimulationResult(BaseModel):
    patient_id: str
    recommended_treatment: str
    success_rate: float
    alternative_treatments: List[str]

