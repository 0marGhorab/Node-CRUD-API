# Node User API

A simple **Node.js REST API** built without frameworks (only the built-in `http` module).  
It supports basic CRUD operations on a mock in-memory database (`dp.js`).

## 🚀 Features

- `GET /` → Fetch **all users** (also returns `count`)
- `POST /register` → Register a new user (email must be unique)
- `PUT /update/:id` → Update a user by ID (partial updates supported)
- `DELETE /delete/:id` → Delete a user by ID

## 🛠 Tech Stack

- Node.js (`http` module)
- Postman (for testing)

## 📦 Setup

1. Clone the repo:

````bash
git clone https://github.com/YOUR_USERNAME/node-user-api.git
cd node-user-api

2) Run the server:
```bash
node server.js

3) Base URL:
http://localhost:5050

## 📬 API Endpoints
# GET /

Example response:
{
  "message": "All users",
  "users": [
    { "id": 1, "username": "ali", "email": "ali@example.com", "age": 22 },
    { "id": 2, "username": "omar", "email": "omar@gmail.com", "age": 24 }
  ],
  "count": 2,
  "status": 200
}

# POST /register

Body (JSON):
{
  "id": 11,
  "username": "newuser",
  "email": "newuser@example.com",
  "age": 23
}

Responses

201 → { "message": "user added successfully" }

409 → { "message": "email already exist" }

400 → { "message": "Invalid JSON format" }

# PUT /update/:id

URL example: /update/2
Body (JSON):

{ "username": "omar updated", "age": 25 }


Responses

200 → { "message": "user updated successfully", "user": { ... } }

404 → { "message": "user not found" }

# DELETE /delete/:id

URL example: /delete/3

Responses

200 → { "message": "user deleted successfully" }

404 → { "message": "user not found" }
````

# 📌 Example User Object

{ "id": 2, "username": "omar", "email": "omar@gmail.com", "age": 24 }

# 📝 Notes

Data is stored in memory (array in dp.js) and resets when the server restarts.

Always send Content-Type: application/json for requests with a JSON body.
