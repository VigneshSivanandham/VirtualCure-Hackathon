import json
from pathlib import Path
from backend.utils.logger import log_info, log_error

def load_data(file_path: str):
    path = Path(file_path)
    if not path.exists():
        return []
    try:
        with open(file_path, "r") as file:
            return json.load(file)
    except json.JSONDecodeError:
        log_error(f"Error loading JSON data from {file_path}")
        return []

def save_data(file_path: str, data):
    try:
        with open(file_path, "w") as file:
            json.dump(data, file, indent=4)
        log_info(f"Data successfully saved to {file_path}")
    except Exception as e:
        log_error(f"Failed to save data to {file_path}: {str(e)}")

