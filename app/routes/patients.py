from fastapi import APIRouter, HTTPException
from app.services import patient_service
from app.models.models import Patient

router = APIRouter(prefix="/patients", tags=["Patients"])

@router.get("/", response_model=list[Patient])
def get_patients():
    return patient_service.get_all_patients()

@router.post("/", response_model=Patient)
def add_patient(patient: Patient):
    return patient_service.add_patient(patient)

@router.get("/{patient_id}", response_model=Patient)
def get_patient(patient_id: str):
    patient = patient_service.get_patient(patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

