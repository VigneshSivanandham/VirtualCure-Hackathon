import torch
import logging
from transformers import BioGptTokenizer, BioGptForCausalLM

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MODEL_NAME = "microsoft/BioGPT"

def load_model():
    """Loads the BioGPT model and tokenizer."""
    try:
        logger.info("Loading BioGPT model and tokenizer...")
        tokenizer = BioGptTokenizer.from_pretrained(MODEL_NAME)
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        model = BioGptForCausalLM.from_pretrained(MODEL_NAME).to(device)
        logger.info(f"Model loaded successfully on {device}")
        return tokenizer, model, device
    except Exception as e:
        logger.error(f"Error loading BioGPT model: {e}")
        raise

# Load model and tokenizer globally
tokenizer, model, device = load_model()

def is_valid_question(prompt: str) -> bool:
    """Checks if the input question is valid (not empty or nonsense)."""
    return bool(prompt and prompt.strip())

def generate_biogpt_text(prompt: str, max_length: int = 250):
    """
    Generates a medically relevant response using BioGPT.

    Args:
        prompt (str): The medical question or query.
        max_length (int): Maximum length of the response.

    Returns:
        str: Generated medical response from BioGPT.
    """
    if not is_valid_question(prompt):
        logger.warning("Invalid input received for BioGPT generation.")
        return "Invalid input. Please provide a valid medical question."

    try:
        # Format the input prompt
        input_text = f"Question: {prompt}\nAnswer:"
        inputs = tokenizer(input_text, return_tensors="pt").to(device)

        # Generate response
        output = model.generate(
            **inputs,
            max_length=max_length,
            do_sample=True,
            top_k=50,
            top_p=0.95,
            temperature=0.7,
            repetition_penalty=1.2
        )

        # Decode the generated text
        generated_text = tokenizer.decode(output[0], skip_special_tokens=True).strip()

        # Ensure response is meaningful
        return generated_text if generated_text else "No meaningful response generated."
    
    except Exception as e:
        logger.error(f"Error generating response: {e}")
        return "An error occurred while generating the response."

# Example usage
if __name__ == "__main__":
    sample_question = "How does aspirin work?"
    response = generate_biogpt_text(sample_question)
    print(f"BioGPT Response: {response}")

