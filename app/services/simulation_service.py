import random
from app.models.models import SimulationRequest, SimulationResult
from app.utils.storage import load_data
from app.utils.logger import log_info, log_error

TREATMENT_OPTIONS = ["Treatment A", "Treatment B", "Treatment C"]

def run_simulation(request: SimulationRequest):
    patients = load_data("VirtualCure/data/patients.json")
    patient = next((p for p in patients if p["id"] == request.patient_id), None)
    
    if not patient:
        log_error(f"Patient {request.patient_id} not found for simulation.")
        return None

    recommended_treatment = random.choice(TREATMENT_OPTIONS)
    success_rate = round(random.uniform(70, 95), 2)

    log_info(f"Simulation run for patient {request.patient_id}. Treatment: {recommended_treatment}")

    return SimulationResult(
        patient_id=request.patient_id,
        recommended_treatment=recommended_treatment,
        success_rate=success_rate,
        alternative_treatments=[t for t in TREATMENT_OPTIONS if t != recommended_treatment]
    )

