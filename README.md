<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Prerequisites
- Docker
- Docker Compose
- Postman (for testing APIs)
- pgAdmin 4 (optional)

⚠️ This project <b>cannot run locally without Docker</b> because the database connection is configured only via Docker.

## Project Structure
```bash
src/
 ├── auth/             # Authentication module (JWT + Passport)
 ├── users/            # User management module
 ├── restaurants/      # Restaurants module
 ├── foods/            # Foods module
 ├── orders/           # Orders module
 ├── app.module.ts     # Main module
 └── main.ts           # Entry point
```

#### Key Notes:
- Entities are auto-loaded using TypeORM.
- JWT secret and database credentials are loaded from .env.

## Environment Variables
Create a .env file in the project root:
```bash
DATABASE_HOST=localhost
DATABASE_PORT=5433
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=your_database_name
JWT_SECRET=your_jwt_secret
```

## Running the Project with Docker
#### 1. Build and start containers:

```bash
$ docker-compose up --build
```

#### This will:
- Start a PostgreSQL container.
- Start the NestJS app container.
- Map app port 3000 to 4000 on your host.

#### 2. Check containers are running:
```bash
$ docker ps
```

#### You should see two containers:
- PostgreSQL
- NestJS backend

## Database Access
- PostgreSQL is running in Docker.
- You can connect using pgAdmin 4 or psql with the credentials from .env.
- Default Docker port mapping: 5433:5432 (host:container).

## Testing API with Postman
#### 1. Set base URL:
```bash
http://localhost:4000
```

#### 2. Example endpoints:
```bash
| Method | Endpoint       | Description                  |
| ------ | -------------- | ---------------------------- |
| POST   | /auth/login    | Login user and get JWT token |
| POST   | /auth/register | Register a new user          |
| GET    | /restaurants   | Get all restaurants          |
| POST   | /foods         | Add a new food item          |
| POST   | /orders        | Create an order              |
```

#### 3. Include JWT in Authorization Header for protected routes:
```bash
Authorization: Bearer <your_token_here>
```

## Notes
- Database must run via Docker to avoid connection errors.
- If you shut down your PC, restart containers using:
```bash
docker-compose up
```


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
