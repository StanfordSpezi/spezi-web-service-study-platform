# 🧪 Spezi Web Service Study Platform

This is the backend service for the Spezi Web Service Study Platform, built with [NestJS](https://docs.nestjs.com/) and [MikroORM](https://mikro-orm.io/) using PostgreSQL.

It is containerized with Docker for local development and CI testing. It includes Swagger docs, health checks, and a modular, testable architecture.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/StanfordSpezi/spezi-web-service-study-platform.git
cd spezi-web-service-study-platform
```

### 2. Setup Environment Variables

The .env file included **will work** in local development environment.  If you would like to make changes create a .env file in the root by copying the example:

```bash
cp .env.example .env
```

Update it as needed, especially:

```bash
DB_HOST=host.docker.internal
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=spezi-study-platform
```

### 3. Running the App with Docker

Development Mode (with hot reload)

```bash
docker compose up --build
```

- Exposes API at: <http://localhost:3000>
- Swagger Docs: <http://localhost:3000/docs>
- Health Check: <http://localhost:3000/health>

### 4. Running Tests

To spin up a container and run all tests:

```bash
docker compose up --build
```

On the local machine run:

```bash
npm run test
```

A folder called `coverage` will also be generated with a code coverage report.
