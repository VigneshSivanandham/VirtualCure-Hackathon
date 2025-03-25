from fastapi import APIRouter, HTTPException
from models.models import SimulationRequest, SimulationResult
from services import simulation_service

router = APIRouter(prefix="/simulate", tags=["Simulation"])

@router.post("/", response_model=SimulationResult)
def run_simulation(request: SimulationRequest):
    result = simulation_service.run_simulation(request)
    if not result:
        raise HTTPException(status_code=400, detail="Simulation failed")
    return result

