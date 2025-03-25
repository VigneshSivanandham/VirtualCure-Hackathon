from models.models import Patient
from utils.storage import load_data, save_data
from utils.logger import log_info, log_error

PATIENTS_FILE = "VirtualCure/data/patients.json"

def get_all_patients():
    return load_data(PATIENTS_FILE)

def add_patient(patient: Patient):
    patients = load_data(PATIENTS_FILE)

    # Check for duplicate patient ID
    if any(p["id"] == patient.id for p in patients):
        log_error(f"Duplicate Patient ID: {patient.id}")
        raise ValueError("Patient ID already exists")

    patients.append(patient.dict())
    save_data(PATIENTS_FILE, patients)
    log_info(f"New patient added: {patient.id}")
    return patient

def get_patient(patient_id: str):
    patients = load_data(PATIENTS_FILE)
    return next((p for p in patients if p["id"] == patient_id), None)

