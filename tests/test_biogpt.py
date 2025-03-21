from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_biogpt_endpoint():
    response = client.post("/api/biogpt", json={"query": "Effect of aspirin on blood clotting"})
    assert response.status_code == 200
    assert "generated_response" in response.json()

