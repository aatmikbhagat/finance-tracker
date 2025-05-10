# Finance Tracker

A full-stack finance tracking application built with React, Node.js, Express, and MongoDB.

## Features

- Track income and expenses
- View transaction history
- Calculate total balance
- Categorize transactions
- Delete transactions
- Responsive Material-UI design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or a MongoDB Atlas account)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/finance-tracker
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   cd server
   npm start
   ```

5. In a new terminal, start the frontend development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## Technologies Used

- Frontend:
  - React
  - TypeScript
  - Material-UI
  - Axios

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose

## License

MIT 