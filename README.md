# Workshop with Contract testing with [Pact](https://docs.pact.io/)
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

## 3. Create contract test
```
$cd contract-test
$npm install @pact-foundation/pact jest @types/jest --save-dev
```

Run test
```
$npm i
$npm test
```

See results
* Contract file in folder `pacts`

## 4. Upload or publish contract file to [Pact Broker](https://docs.pact.io/pact_broker)

### 4.1 Start Pact broker with docker compose

file compose.yml
```
services:
  postgres:
    image: postgres
    healthcheck:
      test: psql postgres --command "select 1" -U postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: postgres

  pact_broker:
    image: pactfoundation/pact-broker
    ports:
      - 9292:9292
    environment:
      PACT_BROKER_BASIC_AUTH_USERNAME: pact_workshop
      PACT_BROKER_BASIC_AUTH_PASSWORD: pact_workshop
      PACT_BROKER_DATABASE_USERNAME: postgres
      PACT_BROKER_DATABASE_PASSWORD: password
      PACT_BROKER_DATABASE_HOST: postgres
      PACT_BROKER_DATABASE_NAME: postgres
  pact_broker_publish:
    image: pactfoundation/pact-cli
    environment:
      PACT_BROKER_BASE_URL: http://pact_broker:9292
      PACT_BROKER_USERNAME: pact_workshop
      PACT_BROKER_PASSWORD: pact_workshop
    command: 'publish /pacts --consumer-app-version 1.0.0'
    volumes:
      - ./pacts:/pacts

  pact_broker_verify:
    image: pactfoundation/pact-cli
    environment:
      PACT_BROKER_BASE_URL: http://pact_broker:9292
      PACT_BROKER_USERNAME: pact_workshop
      PACT_BROKER_PASSWORD: pact_workshop
      PACT_BROKER_PUBLISH_VERIFICATION_RESULTS: true
    command: 'verify  --provider-base-url http://host.docker.internal:4000 --provider user-service --provider-app-version 1.0.0 --wait 10'
```

Start
```
$docker compose up -d
$docker compose ps
```

Access to server
* http://localhost:9292
  * user=pact_workshop
  * password=pact_workshop

### 4.2 Publish contract file to server
* Install [Pact Broker CLI](Install Pact Broker CLI)
  * Required [Ruby](https://www.ruby-lang.org/en/)
```
$pact-broker publish ./pacts --consumer-app-version 1.0 --broker-base-url http://localhost:9292 --broker-username pact_workshop --broker-password pact_workshop
```

Or with docker compose
```
$docker compose up pact_broker_publish --remove-orphans
```

## 5. Verify by provider/producer of service
```
$pact-provider-verifier --provider-base-url http://localhost:3000 --pact-broker-base-url http://localhost:9292 --broker-username pact_workshop --broker-password pact_workshop --provider backend --wait 10 --publish-verification-results true --provider-app-version 1.0.0 --wait 10 
```

Or with docker compose
```
$docker compose up pact_broker_verify --remove-orphans
```
