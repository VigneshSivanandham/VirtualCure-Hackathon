import random
from models.models import SimulationRequest, SimulationResult
from utils.storage import load_data
from utils.logger import log_info, log_error
from services.biogpt_service import BioGPTModel


TREATMENT_OPTIONS = ["Treatment A", "Treatment B", "Treatment C"]

# Initialize BioGPT Model
biogpt = BioGPTModel()

def run_simulation(request):
    try:
        prompt = f"""Analyze drug interaction for:
        Drug: {request.drug_name}
        Dosage: {request.dosage}mg
        Frequency: {request.frequency}
        
        Consider patient profile and provide:
        1. Expected effectiveness
        2. Potential side effects
        3. Drug interactions
        4. Recommendations"""

        # Call BioGPT for response
        response = biogpt.generate_response(prompt)

        return {
            "effectiveness": response.get("effectiveness", 0.75),
            "side_effects": response.get("side_effects", ["Unknown side effects"]),
            "interactions": response.get("interactions", []),
            "recommendations": response.get("recommendations", ["Consult with a doctor"])
        }
    except Exception as e:
        print(f"Simulation error: {str(e)}")
        return None