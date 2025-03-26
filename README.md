# Virtual Cure

Virtual Cure is an AI-powered medical diagnosis and drug simulation application that combines a FastAPI backend with a React frontend. The application uses Groq's Mixtral-8x7b model for patient diagnosis and includes a simulated drug interaction analysis system.

## Features

- Patient information collection and symptom analysis
- AI-powered initial medical diagnosis
- Drug interaction simulation
- Comprehensive medical summary reports

## Prerequisites

- Python 3.8 or higher
- Node.js 14.x or higher
- npm 6.x or higher
- Groq API key

## Project Structure

```
Virtual-Cure/
├── README.md                 # Project documentation
├── .gitignore               # Git ignore rules for the project
│
├── backend/
│   ├── main.py             # FastAPI application with routes and logic
│   ├── requirements.txt    # Python dependencies
│   ├── .env               # Environment variables (Groq API key)
│   └── __pycache__/       # Python bytecode cache (ignored by git)
│
└── frontend/
    ├── package.json        # Node.js dependencies and scripts
    ├── package-lock.json   # Locked versions of dependencies
    ├── .gitignore         # Git ignore rules for frontend
    │
    ├── public/
    │   ├── index.html     # HTML entry point
    │   ├── favicon.ico    # Website icon
    │   ├── manifest.json  # PWA manifest
    │   └── robots.txt     # Search engine instructions
    │
    └── src/
        ├── index.js       # React entry point
        ├── App.js         # Main React component
        │
        ├── components/
        │   └── Navbar.js  # Navigation component
        │
        ├── pages/
        │   ├── UserSelection.js     # Patient info entry page
        │   ├── InitialDiagnosis.js  # Diagnosis display page
        │   ├── DrugSimulation.js    # Drug simulation page
        │   └── Summary.js           # Final report page
        │
        └── styles/
            └── App.css    # Global styles
```

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Linux/Mac
python -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up your Groq API key:
- Create a `.env` file in the backend directory
- Add your Groq API key:
```
GROQ_API_KEY=your_api_key_here
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the backend server (from the backend directory):
```bash
uvicorn main:app --reload
```
The backend will run on http://localhost:8000

2. Start the frontend development server (from the frontend directory):
```bash
npm start
```
The frontend will run on http://localhost:3000

## Usage

1. **Patient Information Entry**
   - Enter patient details
   - Select relevant symptoms
   - Submit for diagnosis

2. **Initial Diagnosis**
   - Review AI-generated diagnosis
   - Check confidence level
   - View medical recommendations

3. **Drug Simulation**
   - Enter drug details
   - Review drug interaction analysis
   - Check potential side effects

4. **Summary Report**
   - View comprehensive medical summary
   - Review all collected information
   - Access recommendations


A report of the above is available in the virtual cure2 file as a pdf.
## API Endpoints

- `GET /`: Welcome message
- `POST /diagnose`: Patient diagnosis endpoint
- `POST /drug-simulation`: Drug interaction simulation endpoint

### Testing API Endpoints in Postman

1. **Setup Postman**
   - Download and install [Postman](https://www.postman.com/downloads/)
   - Create a new collection named "Virtual Cure API"

2. **Testing Diagnosis Endpoint**
   ```
   URL: http://localhost:8000/diagnose
   Method: POST
   Headers: 
     Content-Type: application/json
   Body (raw JSON):
   {
     "name": "John Doe",
     "age": 30,
     "symptoms": ["Fever", "Cough", "Fatigue"],
     "id": null,
     "medical_history": null
   }
   ```

3. **Testing Drug Simulation Endpoint**
   ```
   URL: http://localhost:8000/drug-simulation
   Method: POST
   Headers:
     Content-Type: application/json
   Body (raw JSON):
   {
     "patient_id": 1,
     "drug_name": "Aspirin",
     "dosage": 100,
     "frequency": "twice daily"
   }
   ```

4. **Common HTTP Status Codes**
   - 200: Successful request
   - 400: Bad request (check request body)
   - 422: Validation error (check required fields)
   - 500: Server error (check backend logs)

5. **Testing Tips**
   - Ensure the backend server is running
   - Check that the port (8000) is correct
   - Verify all required fields are included
   - Monitor the backend console for error messages

## Technologies Used

- **Backend**
  - FastAPI
  - OpenAI Python SDK (for Groq API)
  - Pydantic
  - Python-dotenv

- **Frontend**
  - React
  - Material-UI
  - Axios
  - React Router

## Troubleshooting

1. **Backend Issues**
   - Ensure virtual environment is activated
   - Verify Groq API key is correctly set
   - Check Python version compatibility

2. **Frontend Issues**
   - Clear npm cache if needed: `npm cache clean --force`
   - Ensure all dependencies are installed
   - Check for Node.js version compatibility

3. **API Connection Issues**
   - Verify backend is running on port 8000
   - Check CORS settings if needed
   - Ensure network connectivity

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Groq for providing the AI model API
- Material-UI for the component library
- FastAPI for the backend framework

Sample Queries & Responses

Query - "How does aspirin work?"	
AI Response - "Aspirin is a potent inhibitor of matrix metalloproteinase-9 expression and activity in human aortic endothelial cells."
Query - "What are the side effects of statins?"	
AI Response- "Statin use is associated with a lower risk for acute pancreatitis."
Deployment Options
VirtualCure can be deployed using Docker or cloud platforms like AWS/Azure. For local development, simply run the backend and frontend as described above.
