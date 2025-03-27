import torch
import logging
from transformers import BioGptTokenizer, BioGptForCausalLM

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MODEL_NAME = "microsoft/BioGPT"
from transformers import pipeline

class BioGPTModel:
    def __init__(self):
        self.model = MODEL_NAME

    def generate_response(self, prompt):
        response = self.model(prompt, max_length=200)
        return self.parse_response(response[0]['generated_text'])

    def parse_response(self, text):
        lines = text.split("\n")
        parsed_result = {"effectiveness": 0.75, "side_effects": [], "interactions": [], "recommendations": []}

        for line in lines:
            if "Effectiveness:" in line:
                parsed_result["effectiveness"] = float(line.split(":")[1].strip())
            elif "Side Effects:" in line:
                parsed_result["side_effects"] = [effect.strip() for effect in line.split(":")[1].split(",")]
            elif "Interactions:" in line:
                parsed_result["interactions"] = [inter.strip() for inter in line.split(":")[1].split(",")]
            elif "Recommendations:" in line:
                parsed_result["recommendations"] = [rec.strip() for rec in line.split(":")[1].split(",")]

        return parsed_result


