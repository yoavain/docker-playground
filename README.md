# Learning Docker...

1) DynamoDB local server (port 8000)
2) DynamoDB Admin server (port 8001)
3) Express server (port 3000)
4) Fastify server (port 3001)
5) Implement best practices from https://cheatsheetseries.owasp.org/cheatsheets/NodeJS_Docker_Cheat_Sheet.html

---

## To run:

### 1. Dependencies
```shell
npm install
```

### 2. Verdaccio container

* Make sure you start verdaccio container
```shell
npm run run:verdaccio
```

* First time use:
```shell
npm adduser --registry http://localhost:4873/
```

copy token from .~/.npmrc or %USERPROFILE%\.npmrc

create a `.env` file in the root folder containing
```dotenv
VERDACCIO_TOKEN=<YOUR TOKEN>
```

### 3. Docker compose
```shell
npm run start
```

---

## Benchmark

#### Express server
```shell
npm run benchmark:express
```

#### Fastify server
```shell
npm run benchmark:fastify
```
