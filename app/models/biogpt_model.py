from pydantic import BaseModel

class BioGPTRequest(BaseModel):
    query: str

class BioGPTResponse(BaseModel):
    input: str
    generated_response: str

