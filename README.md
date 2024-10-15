# Workshop with Contract testing
* Frontend
  * ReactJS 
* Backend
  * NodeJS

## 1. Backend service
* REST API

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

List of url
* 200 => http://localhost:3000/users/1
* 404 => http://localhost:3000/users/2