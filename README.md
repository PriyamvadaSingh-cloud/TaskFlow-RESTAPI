# TaskFlow – Task Management REST API

TaskFlow is a backend REST API application built using Node.js and Express.js. It allows users to register, log in securely, and manage their personal tasks through authenticated API endpoints.

The application uses Supabase PostgreSQL for database storage and JWT for authentication.

## Features

 User registration and login
 Secure password hashing using bcrypt
 JWT-based authentication
 Create, read, update, and delete tasks
 User-specific task access and authorization
 Input validation
 PostgreSQL database integration
 RESTful API architecture
 Proper HTTP status codes and error responses

## Tech Stack

 Technology  Purpose 

 Node.js  JavaScript runtime 
 Express.js  Backend framework 
 PostgreSQL  Relational database 
 Supabase  Hosted PostgreSQL database 
 pg  PostgreSQL database connection 
 JWT  Authentication 
 bcrypt  Password hashing 
 Postman  API testing

## Project Structure

   text
API/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── taskController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Installation and Setup

### 1. Clone the repository

 bash
git clone https://github.com/PriyamvadaSingh-cloud/TaskFlow-RESTAPI.git
cd TaskFlow-RESTAPI
 


### 2. Install dependencies

 bash
npm install


### 3. Configure environment variables

Create a `.env` file in the root directory.

```env
PORT=5000
DATABASE_URL=your_supabase_postgresql_connection_string
JWT_SECRET=your_private_jwt_secret
```

Replace the placeholder values with your own credentials.

**Never upload your actual `.env` file or expose database credentials.**

### 4. Start the server

Development mode:

```bash
npm run dev
```

Production-style start:

```bash
npm start
```

The server runs at:

```text
http://localhost:5000
```

## API Endpoints

Base URL:

```text
http://localhost:5000
```

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login an existing user |

### Task APIs

All task endpoints require a valid JWT Bearer token.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | Get all tasks of logged-in user |
| GET | `/api/tasks/:id` | Get a specific task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check server and database connectivity |

## Request Examples

### Register User

`POST /api/auth/register`

```json
{
  "name": "Test User",
  "email": "user@example.com",
  "password": "YourPassword123"
}
```

### Login User

`POST /api/auth/login`

```json
{
  "email": "user@example.com",
  "password": "YourPassword123"
}
```

The login response provides a JWT token.

Use this token in the Authorization header for protected endpoints:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

### Create Task

`POST /api/tasks`

```json
{
  "title": "Complete Assignment",
  "description": "Finish the TaskFlow backend project",
  "status": "pending",
  "priority": "high"
}
```

### Update Task

`PUT /api/tasks/:id`

```json
{
  "title": "Updated Task",
  "status": "completed",
  "priority": "medium"
}
```

### Delete Task

`DELETE /api/tasks/:id`

## Task Status and Priority

**Allowed task statuses:**
 `pending`
 `in_progress`
 `completed`

**Allowed priorities:**
 `low`
 `medium`
 `high`

## Security

 Passwords are hashed using bcrypt before database storage.
 JWT tokens protect task endpoints.
 Users can access and modify only their own tasks.
 SQL queries use parameterized values to reduce SQL injection risks.
 Environment variables are used for sensitive configuration.
 Input validation prevents invalid task data.

## Database

The project uses Supabase PostgreSQL with two primary tables:

 `users` – Stores user account information and hashed passwords.
 `tasks` – Stores tasks associated with individual users.

Each task is linked to its owner through `user_id`.

## API Testing

All API endpoints were tested using Postman, including:

 User registration and login
 Task CRUD operations
 Missing and invalid input validation
 Invalid JWT token handling
 Unauthorized task access
 Duplicate email registration
 User-specific task authorization

## Author

**Priyamvada Singh**

TaskFlow – Backend Development Internship Assignment