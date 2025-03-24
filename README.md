# VirtualCure-Hackathon
AI-driven healthcare assistant for drug research

# VirtualCure: AI-Powered Medical Assistant

## Overview
VirtualCure is an AI-powered medical assistant designed to provide **clinically relevant** and **contextually accurate** responses to medical queries. Built using **Microsoft's BioGPT**, it enhances **medical decision-making** for healthcare professionals and ensures reliable information for patients.

---

## Problem Statement
Many online health resources provide **misleading or unverified** medical information, leading to confusion and potential harm. **VirtualCure** addresses this issue by offering **fact-checked, AI-generated medical insights**, reducing misinformation and supporting doctors, researchers, and patients.

---

## Key Features
- **Clinically accurate medical responses** (powered by BioGPT)
- **Conversational AI for real-time health assistance**
- **Understands medical terminologies and drug interactions**
- **REST API for seamless integration into healthcare systems**
- **Lightweight and scalable deployment options**

---

## Tech Stack
- **Model:** [BioGPT (Microsoft)](https://huggingface.co/microsoft/BioGPT)
- **Framework:** PyTorch, Hugging Face Transformers
- **Backend:** FastAPI for API handling
- **Frontend:** React/Next.js (under development)
- **Deployment:** Docker / AWS / Azure (optional)

---

## 🔧 Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js (for frontend, if applicable)

### Backend Setup
#### 1️⃣ Install Dependencies
Run the following command to install all required packages:
```sh
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install transformers fastapi uvicorn pydantic[dotenv] requests
```

#### 2️⃣ Run the API Server
```sh
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

#### 3️⃣ Example API Request
```sh
curl -X POST "http://localhost:8000/generate" \
     -H "Content-Type: application/json" \
     -d '{"query": "How does aspirin work?"}'
```

### Frontend Setup (If applicable)
#### 1️⃣ Install Dependencies
```sh
cd frontend
npm install
```

#### 2️⃣ Create Environment File
Create a `.env.local` file inside the `frontend/` folder and add:
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

#### 3️⃣ Start Frontend
```sh
npm run dev
```
Frontend will be available at **http://localhost:3000**

---

## Sample Queries & Responses
| **Query** | **AI Response** |
|-----------|----------------|
| "How does aspirin work?" | "Aspirin is a potent inhibitor of matrix metalloproteinase-9 expression and activity in human aortic endothelial cells." |
| "What are the side effects of statins?" | "Statin use is associated with a lower risk for acute pancreatitis." |

---

## Deployment Options
VirtualCure can be deployed using Docker or cloud platforms like AWS/Azure. For local development, simply run the backend and frontend as described above.

---
