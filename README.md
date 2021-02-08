# Simple chat

A simple chat application built using [GraphQL](https://graphql.org/) with [Spring Boot](https://spring.io/projects/spring-boot) as a back-end, [PostgreSQL](https://www.postgresql.org/) as a database and [React](https://reactjs.org/) as a front-end.

# Usage

## Back-end
Before running the project, the following environment variables should be set (example values are in parentheses):
* SIMPLECHAT_SECURITY_PROPERTIES_PASSWORDSTRENGTH (10)
* SIMPLECHAT_SECURITY_PROPERTIES_TOKENSECRET (f2my6B9kHT6BXQMG)
* SPRING_DATASOURCE_URL (jdbc:postgresql://localhost:5432/simple_chat)
* SPRING_DATASOURCE_USERNAME
* SPRING_DATASOURCE_PASSWORD

The application url is http://localhost:8080/

## Front-end
```
cd simple-chat-graphql-frontend
npm install
npm start
```

The application url is http://localhost:3000/

