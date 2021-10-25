# Description

---

App creates the table with necessary columns. Backend provides CRUD operations and support reactive notifications to clients about updates (You can try open app in 2 browsers, start work with one of it and check out synchronization between clients).

# Install 

---

The simplest way to build and run application is to run it in docker containers using my Dockerfiles and Docker-compose (the only one dependency you need is [Docker compose](https://docs.docker.com/compose/install/))

Run command from the root of repo:
```bash
sudo docker-compose up --build
```

After all parts of app will up - go to `http:localhost:3000` in your browser.

Or you can also might want to run application locally. Configuration file is here: `backend/.env` 
```bash
cd frontend/ && npm start
cd backend/ && npm run start
```

You can run tests with next cmd for both parts of application:
```bash
npm run test
```

# Stack
Technologies I used:
* [React](https://reactjs.org/) - Frontend part
* [Nest JS](https://nestjs.com/) - Backend part
* [Material-UI](https://material-ui.com/) - Frontend UI library
* [TypeScript](https://www.typescriptlang.org/) - Strongly typed programming language that builds on JavaScript
* [Typeorm](https://typeorm.io/#/) - ORM
* [Socket-io](https://socket.io/) - Websockets for reactivity support
* [Effector](https://effector.dev/) - Frontend state manager
* [Docker](https://www.docker.com/) - Containerization tool
