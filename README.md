# Crypto Tracker
This project is a full-stack cryptocurrency price tracker built using React, Redux Toolkit, Express.js, and the CoinGecko API. It allows users to view live cryptocurrency prices, track their market cap, volume, and price changes over different time periods, as well as see historical price charts for individual coins.

# Features
- Real-time cryptocurrency prices.
- Detailed coin stats (market cap, volume, circulating supply, etc.).
- Historical price chart for each coin (7 days).
- Pagination for listing the top coins.
- Coin details page with a price chart.
- Responsive table and charts.

# Tech Stack
**Frontend** 
    - React
    - Redux Toolkit
    - Axios
    - React Router
    - Chart.js (for historical price charts)
    - Vite (for bundling)

**Backend**
    - Express.js
    - Axios (to fetch data from CoinGecko API)
    - CORS (for cross-origin requests)

# Setup
Prerequisites
  Node.js
  npm or yarn

# Installation
1. Clone the repository:
    git clone (https://github.com/Monib007/Real-Time-Crypto-Price-Tracker.git)
    cd crypto-tracker
   
2. Navigate to the backend directory and install dependencies:
    cd backend
    npm install
   
3.Navigate to the frontend directory and install dependencies:
    cd frontend
    npm install
    
# Backend Setup (Express)
The backend is responsible for fetching cryptocurrency data from the CoinGecko API and serving it through a local API endpoint. The backend uses CORS to allow cross-origin requests from the frontend.

**Running the Backend**
  1. Navigate to the backend folder:
      cd backend
     
  2. Create a .env file in the backend folder and add your environment variables (if any).
     
  3. Start the backend server:
      npm start
     
  4.The backend will run on http://localhost:5000.

# API Endpoints
**GET /api/crypto** : Fetches cryptocurrency data such as prices, market cap, and 1h/24h/7d price changes.

# Frontend Setup (React)
The frontend fetches the data from the backend, displays it in a responsive table, and shows detailed coin information and price history on a separate page.

**Running the Frontend**
1. Navigate to the frontend folder:
    cd frontend
   
2. Start the frontend development server:
    npm run dev
   
3.The frontend will run on http://localhost:3000.

# Folder Structure

/crypto-tracker
├── /backend
│   ├── index.js              # Express backend server
│   ├── package.json           # Backend dependencies
│   ├── .env                  # Environment variables (if any)
│
├── /frontend
│   ├── /src
│   │   ├── /components        # React components
│   │   ├── /redux             # Redux state management
│   │   ├── App.tsx            # Main app component
│   │   ├── index.tsx          # React entry point
│   │   ├── CryptoTable.tsx    # Table for showing cryptocurrencies
│   │   ├── CryptoDetails.tsx  # Coin details page with chart
│   ├── package.json           # Frontend dependencies
│   ├── tsconfig.json          # TypeScript configuration
│   ├── vite.config.ts         # Vite configuration
│
└── README.md                 # This README file

# Project Workflow
**Frontend (React)**
  - App.tsx: The main entry point for routing in the app.
  - Handles the routing to display either the CryptoTable or CryptoDetails component.
  - CryptoTable.tsx: Displays a table of cryptocurrencies with the ability to click on any coin to view its details.
  - Uses Redux to manage state and display real-time data.
  - CryptoDetails.tsx: Displays detailed information about a selected coin, including current price, market cap, volume, and a price chart for the last 7 days.
  - Redux Store: Manages state for cryptocurrency data (cryptoSlice.ts) and provides actions to fetch data from both the backend API and CoinGecko directly.

**Backend (Express)**
  - index.js: The main entry point for the Express server.
  - Defines routes for fetching cryptocurrency data from the CoinGecko API and serving it to the frontend.

**Additional Notes**
  - API Proxy: The frontend fetches data from the local Express server at http://localhost:5000/api/crypto to avoid issues with CORS when making requests directly to CoinGecko.
  - Charts: The frontend uses react-chartjs-2 and chart.js to display the price history of coins in the details page.
  - Pagination: The CryptoTable component supports pagination, displaying 20 coins per page. The pagination controls can be customized to display more pages or adjust the number of items per page.

# Running in Production
To run this project in production:
  1. Build the frontend for production:
      cd frontend
      npm run build
  2. Set up a production server to serve both the frontend and backend, or use tools like nginx to serve the static files and proxy requests to the backend API.

# Acknowledgments
  CoinGecko API: Used for fetching real-time cryptocurrency data.
  React: Frontend framework.
  Redux Toolkit: Used for managing application state.
  Chart.js: Used for displaying cryptocurrency price charts.
