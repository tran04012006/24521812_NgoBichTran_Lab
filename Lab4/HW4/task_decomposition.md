# Task 1: Project Setup

Task 1
├── 1.1. Project initialization
│   ├── Create HW4 directory
│   ├── Create task_decomposition.md
│   └── Configure .gitignore
│
├── 1.2. Frontend initialization
│   ├── Create React project with Vite
│   ├── Install React 19
│   ├── Install React Router
│   ├── Create initial App component
│   └── Configure basic CSS
│
├── 1.3. Backend initialization
│   ├── Initialize Node.js project
│   ├── Install Express
│   ├── Install Mongoose 8
│   ├── Install CORS and dotenv
│   ├── Configure environment variables
│   └── Create basic Express server
│
└── 1.4. Verification
    ├── Verify React version
    ├── Verify Mongoose version
    ├── Run frontend
    ├── Run backend
    └── Verify server response
# Task 2: Database Setup

Task 2
├── 2.1. MongoDB configuration
│   ├── Configure MONGODB_URI
│   ├── Implement environment variable security guard
│   ├── Connect MongoDB using Mongoose 8
│   ├── Remove deprecated connection options
│   └── Handle database connection errors
│
├── 2.2. Database models
│   ├── Create models directory
│   ├── Implement Profile schema
│   ├── Implement Swipe schema
│   ├── Configure required fields
│   └── Configure timestamps
│
└── 2.3. Verification
    ├── Start MongoDB
    ├── Verify successful database connection
    ├── Verify missing environment variable handling
    ├── Verify model initialization
    └── Check sensitive files are ignored by Git
# Task 3: Backend API Implementation

Task 3
├── 3.1. Profile API
│   ├── Create routes directory
│   ├── Implement GET /api/profiles
│   ├── Retrieve profiles using Mongoose
│   ├── Optimize queries using .lean()
│   └── Handle errors using try/catch
│
├── 3.2. Swipe API
│   ├── Implement POST /api/swipe
│   ├── Validate profileId
│   ├── Validate swipe direction
│   ├── Verify profile existence
│   ├── Save swipe records to MongoDB
│   └── Return appropriate HTTP status codes
│
├── 3.3. Sample data
│   ├── Create Himass profile
│   ├── Create TanVuu profile
│   └── Implement database seed script
│
└── 3.4. Verification
    ├── Test GET /api/profiles
    ├── Test POST /api/swipe
    ├── Test invalid requests
    └── Verify database persistence
# Task 4: Multi-Route Dossier Portal

Task 4
├── 4.1. Routing configuration
│   ├── Configure BrowserRouter
│   ├── Create FairPlayAppealPortal component
│   ├── Configure homepage route
│   ├── Configure Himass dossier route
│   ├── Configure TanVuu dossier route
│   └── Configure fallback route
│
├── 4.2. Shared components
│   ├── Create Navbar component
│   ├── Create Home component
│   └── Create reusable DossierView component
│
├── 4.3. Backend integration
│   ├── Configure API base URL
│   ├── Fetch profiles from backend
│   ├── Select profile by username
│   ├── Handle loading state
│   └── Handle API errors
│
├── 4.4. User interface
│   ├── Style navigation bar
│   ├── Style homepage
│   ├── Style dossier cards
│   └── Implement responsive CSS
│
└── 4.5. Verification
    ├── Test homepage
    ├── Test Himass route
    ├── Test TanVuu route
    ├── Test direct URL access
    └── Verify backend integration