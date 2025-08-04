# Mini LinkedIn Clone

This is a full-stack web application that mimics basic functionalities of LinkedIn, built with the MERN stack (MongoDB, Express.js, React.js, and Node.js). Users can register, log in, create posts, and view their profiles and other posts in a feed.

## Live Demo

Frontend: [https://mini-linkedin-iota.vercel.app/](https://mini-linkedin-iota.vercel.app)  
Backend: [https://mini-linkedin-backend-gw7v.onrender.com](https://mini-linkedin-backend-gw7v.onrender.com)

## Features

- User authentication using JWT
- Create and view posts
- View profile information and personal posts
- Responsive design, works on desktop and mobile
- Light and dark theme toggle on profile

## Tech Stack

- **Frontend**: React, Axios, CSS Modules
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (Frontend), Render (Backend)

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB Atlas account (or a local MongoDB instance)

### 1. Clone the repository
https://github.com/hymavathi9121/mini-linkedin


2. Set up the backend
cd server
npm install
Create a .env file inside the server directory with the following variables:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Start the server:
npm start
It should be running at http://localhost:5000.

3. Set up the frontend
cd ../client
npm install
Create a .env file inside the client directory:

REACT_APP_API_URL=https://mini-linkedin-backend-gw7v.onrender.com
Start the React frontend:
npm start
It should be running at http://localhost:3000.

Deployment
The frontend is deployed using Vercel
The backend is hosted on Render
To deploy your own version:
Frontend (Vercel)
Push your client folder to GitHub
Import the project on Vercel
Add the REACT_APP_API_URL environment variable
Deploy
Backend (Render)
Push your server folder to GitHub
Create a new Web Service on Render
Add the environment variables: MONGO_URI, JWT_SECRET
Deploy
Folder Structure
bash
Copy
Edit
mini-linkedin/
├── client/      # React frontend
│   ├── public/
│   ├── src/
│   └── .env
├── server/      # Node/Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── .env
Author
Developed by Hymavathi as part of a LinkedIn-inspired social media platform project.
















