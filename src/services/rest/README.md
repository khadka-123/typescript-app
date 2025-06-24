# Restful API
A simple restful API offering authentication with registration of new user, user is directed to home page when login, and logout for the user to successfully logout from the home page.

## 🚀Features
** GET /api/register - renders a register html form 
** GET api/login - renders a login html form
** POST /api/register ** - Create a New User
** POST /api/login ** - Authenticate a New user and directs User to Home Page
** GET /api/logout - Redirects the User from Home Page to Login Page

## 📦Tech Stack
Language/Framework: Express + Node. js + TypeScript
API :Restful
Database: MongoDB

## 🛠️Installation
1.** Clone the repo **
bash
git clone https://github.com/khadka-123/typescript-app.git
cd typescript-app

2.Install dependencies'
npm install

2.Set Up Environment
PORT=4000
MONGO_URL=mongodb://localhost:27017/db

3.Run Database
MongoDB Server

4.Compile TypeScript to JavaScript
npx tsc

5.Start Server
node dist/src/services/rest/rest.app.ts

🔐 API Endpoints
1.Register
POST /api/register

Request Body (JSON)
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SuperSecure123"
}

Responses
201 Created
renders Login Page

500 Internal Sever Error

2.Login
POST /api/login
Request Body
{
  "email": "john@example.com",
  "password": "SuperSecure123"
}

Responses
200 OK 
renders Home Page

401 Invalid User name or Password

500 Internal Server Error

🧪 Testing

Use Postman, Browser

Render Register Page
1.GET http://localhost:4000/api/register

Render Login Page
2.GET http://localhost:4000/api/login

Create new User
3.POST http://localhost:4000/api/register
body:{name:"john",email:"john@gamil.com","password:John@123"}

Authenticate user and renders to Home Page
4.POST http://localhost:4000/api/login
body:{email:"john@gamil.com","password:John@123"}

Reemoves out User from Home Page
5.GET http://localhost:4000/api/logout

🤝Contributing
1.Fork the project
2.Create a feature branch
3.Commit and push your changes
4.Open a Pull Request

📄License
© 2025 Khadka Baniya


