# VirtualCure-Hackathon
AI-driven healthcare assistant for drug research
#  VirtualCure: AI-Powered Medical Assistant

##  Overview
VirtualCure is an AI-powered medical assistant designed to provide **clinically relevant** and **contextually accurate** responses to medical queries. Built using **Microsoft's BioGPT**, it enhances **medical decision-making** for healthcare professionals and ensures reliable information for patients.

---

##  Problem Statement
Many online health resources provide **misleading or unverified** medical information, leading to confusion and potential harm. **VirtualCure** solves this by offering **fact-checked, AI-generated medical insights**, reducing misinformation and supporting doctors, researchers, and patients.

---

##  Key Features
**Clinically accurate medical responses** (powered by BioGPT)
**Conversational AI for real-time health assistance**
**Understands medical terminologies and drug interactions**
**REST API for seamless integration into healthcare systems**
**Lightweight and scalable deployment options**

---

##  Tech Stack
- **Model:** [BioGPT (Microsoft)](https://huggingface.co/microsoft/BioGPT)
- **Framework:** PyTorch, Hugging Face Transformers
- **Backend:** FastAPI for API handling
- **Deployment:** Docker / AWS / Azure (optional)

---

## 🔧 Installation & Setup

###  Prerequisites
- Python 3.8+

###  Install Dependencies
Run the following command to install all required packages:
```sh
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install transformers fastapi uvicorn
pip install pydantic[dotenv] requests
```

###  Run the API Server
```sh
uvicorn biogpt_service:backend --reload
```

###  Example API Request
```sh
curl -X POST "http://localhost:8000/generate" \
     -H "Content-Type: application/json" \
     -d '{"query": "How does aspirin work?"}'
```

---

##  Sample Queries & Responses
| **Query** | **AI Response** |
|-----------|----------------|
| "How does aspirin work?" | "Aspirin is a potent inhibitor of matrix metalloproteinase-9 expression and activity in human aortic endothelial cells." |
| "What are the side effects of statins?" | "Statin use is associated with a lower risk for acute pancreatitis." |

---
