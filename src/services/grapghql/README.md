# Restful API
A simple grapgql API that fetches todo list and return in JSON

## 🚀Features
** GET /graphql - fetches todo list from jsonPlaceholder website 
** GET /other - give error as none of the route matches


## 📦Tech Stack
Language/Framework: Express + Node. js + TypeScript
API :graphql

## 🛠️Installation
1.** Clone the repo **
bash
git clone https://github.com/khadka-123/typescript-app.git
cd typescript-app

2.Install dependencies'
npm install

2.Set Up Environment
PORT=4000

4.Compile TypeScript to JavaScript
npx tsc

5.Start Server
node dist/src/services/graphql/graphql.app.ts

🔐 API Endpoints
GET /graphql

Responses Body 
[
    
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  },
]

🧪 Testing

Use Postman, Browser

1.GET http://localhost:5000/garphql


🤝Contributing
1.Fork the project
2.Create a feature branch
3.Commit and push your changes
4.Open a Pull Request

📄License
© 2025 Khadka Baniya


