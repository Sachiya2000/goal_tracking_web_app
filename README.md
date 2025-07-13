# Goal Tracker App

## 📝 Project Overview

Goal Tracker is a full-stack web application that helps users set, manage, and track their personal goals and associated tasks. The app features:

- **User Authentication:** Register and log in securely.
- **Goal Management:** Create, update, and delete goals.
- **Task Management:** Add, update, and delete tasks under each goal.
- **Progress Tracking:** Mark tasks as complete and track goal status.
- **Modern UI:** Responsive, user-friendly interface built with React, Tailwind CSS, and Framer Motion.
- **RESTful API:** Node.js/Express backend with MongoDB for data storage.
- **Docker Support:** Easily run the entire stack with Docker Compose.

---

## 📚 Step-by-Step Setup Instructions

### Prerequisites

- **Node.js**: v18.x recommended (required for both frontend and backend)
- **npm**: v9.x+ (comes with Node.js)
- **MongoDB**: (if not using Docker)
- **Docker & Docker Compose**: (optional, for containerized setup)

---

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd goal-tracker-app
```

---

### 2. Environment Variables

#### Backend

Create a `.env` file inside the `backend/` directory with the following content:

```
MONGO_URI=mongodb://localhost:27017/goaltrackerdb
JWT_SECRET=your_jwt_secret_here
PORT=5001
```

- `MONGO_URI`: MongoDB connection string (use the above for local MongoDB, or see Docker instructions below)
- `JWT_SECRET`: Any random string for JWT signing
- `PORT`: Backend server port (default: 5001)

#### Frontend

No environment variables are required for local development.

---

### 3. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

### 4. Running Locally (Without Docker)

#### Start MongoDB

- Make sure MongoDB is running locally on port 27017.

#### Start Backend

```bash
cd backend
npm start
```

- The backend will run on [http://localhost:5001](http://localhost:5001)

#### Start Frontend

```bash
cd frontend
npm run dev
```

- The frontend will run on [http://localhost:3000](http://localhost:3000)

---

### 5. Running with Docker (Recommended)

Ensure Docker and Docker Compose are installed.

From the project root:

```bash
docker-compose up --build
```

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5001](http://localhost:5001)
- **MongoDB:** [localhost:27017](mongodb://localhost:27017) (exposed for development)

> **Note:** The backend service expects a `JWT_SECRET` environment variable. You can set it in a `.env` file or pass it as an environment variable when running Docker Compose:
>
> Create a `.env` file in the root with:
> ```
> JWT_SECRET=your_jwt_secret_here
> ```

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Axios, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- **Dev Tools:** Docker, Docker Compose, ESLint, Nodemon

---

## 🚀 Key Features

- User registration and login (JWT-based authentication)
- Create, update, and delete goals
- Add, update, and delete tasks under each goal
- Mark tasks as complete/incomplete
- Filter and sort tasks
- Responsive, modern UI
- RESTful API
- Full Docker support for easy deployment

---

## 📂 Project Structure

```
goal-tracker-app/
  backend/      # Express API, MongoDB models, controllers, routes
  frontend/     # React app, components, pages, context, services
  docker-compose.yml
```

---




