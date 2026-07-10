# Open Finance Simulator

Open Finance Simulator is a REST API developed in 2025 during the 400-hour
**Open Finance Powered by AWS** track of the **Compass UOL Scholarship
Program**.

It simulates authorization management, balance retrieval, and debit
transactions using Node.js, Express, Sequelize, and PostgreSQL.

## Features

- Create an Open Finance authorization for a seeded user's account.
- Update an existing authorization or revoke it.
- Retrieve a balance by account number and agency code.
- Execute a simulated debit when the account has an active authorization and
  sufficient funds.
- Persist users, banks, accounts, authorizations, and transactions in
  PostgreSQL.
- Populate the database with development data through Sequelize seeders.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| Node.js | JavaScript runtime |
| Express | HTTP server and routing |
| Sequelize | ORM, migrations, and seeders |
| PostgreSQL | Relational database |
| Docker Compose | Local database container |

## Architecture

The application follows a layered backend structure:

```text
HTTP request
    -> Route
    -> Controller
    -> Service
    -> Repository
    -> Sequelize model
    -> PostgreSQL
```

```text
.
|-- compose.yml                 # Local PostgreSQL service
|-- .env.example                # Environment variable template
|-- src/
|   |-- app/
|   |   |-- controllers/        # HTTP request handling
|   |   |-- models/             # Sequelize models
|   |   |-- repositories/       # Database access
|   |   `-- services/           # Application rules
|   |-- config/                 # Database configuration
|   |-- database/
|   |   |-- migrations/         # Database schema
|   |   `-- seeders/            # Development data
|   |-- routes/                 # API route definitions
|   |-- app.js                  # Express configuration
|   `-- server.js               # Application entry point
`-- README.md
```

## Requirements

- Node.js 18 or later
- npm
- Docker with Docker Compose, or a local PostgreSQL instance

The provided Compose configuration uses PostgreSQL 17.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/marcosschlick/open-finance-simulator.git
cd open-finance-simulator
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Configure the environment

Copy the provided example file:

```bash
cp .env.example .env
```

Then configure `.env` for your environment. The following values work with the
provided PostgreSQL container:

```dotenv
DB_USER=postgres
DB_PASSWORD=postgres
DB_DB=open_finance_simulator
DB_PORT=5432
DB_HOST=localhost
SV_PORT=3333
```

### 4. Start PostgreSQL

```bash
docker compose up -d
```

If you use an existing PostgreSQL instance, skip this step and update `.env`
with its connection details.

### 5. Create and seed the database

```bash
npm run migrate
npm run seed
```

### 6. Start the API

Development mode with file watching:

```bash
npm run dev
```

Standard mode:

```bash
npm start
```

The server is available at `http://localhost:3333` unless `SV_PORT` is changed.

## Demo Data

The API examples below use the following record created by the seeders:

| Field | Value |
| --- | --- |
| User | João Almeida |
| CPF | `12345678901` |
| Bank | Banco Inter |
| Agency | `0001` |
| Account | `00458231` |
| Initial balance | `15000.00` |

## API Reference

All routes use `/openfinance` as their base path and return JSON.
Response examples preserve the Portuguese message strings returned by the
current implementation.

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/openfinance` | Create or replace an account authorization |
| `PATCH` | `/openfinance/update` | Update an existing authorization |
| `PATCH` | `/openfinance/revoke` | Revoke an existing authorization |
| `GET` | `/openfinance?account={account}&agency={agency}` | Retrieve an account balance |
| `POST` | `/openfinance/transaction` | Execute a simulated debit transaction |

### Create an authorization

`expirationDate` is optional. When supplied for an active authorization, it
must be a future date.

```bash
curl --request POST http://localhost:3333/openfinance \
  --header "Content-Type: application/json" \
  --data '{
    "cpf": "12345678901",
    "expirationDate": "2099-12-31T23:59:59.000Z",
    "authorization": true
  }'
```

Successful response (`201 Created`):

```json
{
  "success": true,
  "message": "Compartilhamento feito com sucesso",
  "data": {
    "account": {
      "institutionName": "Banco Inter",
      "account": "00458231",
      "agency": "0001"
    }
  }
}
```

If the account already has an authorization, this endpoint replaces its status
and expiration date.

### Update an authorization

```bash
curl --request PATCH http://localhost:3333/openfinance/update \
  --header "Content-Type: application/json" \
  --data '{
    "cpf": "12345678901",
    "expirationDate": "2099-12-31T23:59:59.000Z",
    "authorization": true
  }'
```

Successful response (`200 OK`):

```json
{
  "success": true,
  "message": "Autorização Atualizada com Sucesso",
  "data": {
    "account": {
      "institutionName": "Banco Inter",
      "account": "00458231",
      "agency": "0001"
    }
  }
}
```

### Revoke an authorization

```bash
curl --request PATCH http://localhost:3333/openfinance/revoke \
  --header "Content-Type: application/json" \
  --data '{
    "cpf": "12345678901"
  }'
```

Successful response (`200 OK`):

```json
{
  "success": true,
  "message": "Autorização Revogada com Sucesso"
}
```

### Retrieve a balance

```bash
curl "http://localhost:3333/openfinance?account=00458231&agency=0001"
```

Successful response (`200 OK`):

```json
{
  "success": true,
  "data": {
    "balance": "15000.00"
  }
}
```

### Create a transaction

The account must have an active Open Finance authorization before a transaction
can be created. The transaction subtracts the requested amount from the current
balance and stores the debit record.

```bash
curl --request POST http://localhost:3333/openfinance/transaction \
  --header "Content-Type: application/json" \
  --data '{
    "account": "00458231",
    "agency": "0001",
    "amount": 343.46
  }'
```

Successful response (`200 OK`):

```json
{
  "success": true,
  "message": "Transação feita com sucesso",
  "data": {
    "balance": 14656.54
  }
}
```

### Error responses

Validation, lookup, authorization, and insufficient-funds failures currently
return `400 Bad Request` in the following format:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the API |
| `npm run dev` | Start the API in watch mode |
| `npm run migrate` | Apply all pending migrations |
| `npm run migrate:undo` | Revert all migrations |
| `npm run seed` | Insert the development data |
| `npm run seed:undo` | Remove all seeded data |

## Current Scope and Limitations

- Authorization operations use the first account associated with the supplied
  CPF.
- Transactions represent debits only and do not transfer funds to a destination
  account.
- Transaction creation checks for active authorization, but balance retrieval
  only validates the account number and agency code.
- The API does not implement authentication, access tokens, encryption flows,
  or production-grade authorization controls.
- The project does not implement the official Open Finance Brasil protocols and
  does not communicate with banks or other external financial services.
- The included data is fictional and intended only for local development.

## Project Status

This is a completed educational project from the 2025 Compass UOL Scholarship
Program. The repository is retained as a record of the backend and Open Finance
concepts practiced during the program.

## License

This project is available under the [MIT License](LICENSE).
