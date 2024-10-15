# Workshop with Contract testing
* Frontend
  * ReactJS 
* Backend
  * NodeJS

## 1. Backend service
* REST API

### API Specification
```
GET /users/:id

Response code = 200
{
  "id": 1,
  "name": "Somkiat Pui"
}

Response code = 404
{
  "message": "User not found"
}

```

### Start backend
```
$cd backend
$npm i
$npm start
```

List of url
* 200 => http://localhost:3000/users/1
* 404 => http://localhost:3000/users/2

## 2. Frontend with React
```
$cd frontend
$npm i
$npm run dev
```

List of url
* http://localhost:5173