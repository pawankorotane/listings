#Listing Service

Host: http://localhost:3001

Run in production

```docker-compose up```

Run in development

```docker-compose -f docker-compose.dev.yml up```

Data Import

This will import all the data in excel into mongoDB

```docker exec -it zoopla_zoopla_1 sh```

```node db-import.js```

Docs

You need to have a swagger install in your machine to see the docs and run below command in the root of the application

```npm i swagger -g```

```swagger project edit```


Test:
```docker exec -it zoopla_zoopla_1 sh```

```npm test```

Ideally we need to have seperate Dockerfile for test to spin up the container, run all the tests and delete the container in the end. Because of time constrain I am not able to implement this functionality.

