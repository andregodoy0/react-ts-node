# Initial Setup - How to run

This project was setup using NodeJS v18; if you're using [nvm](https://github.com/nvm-sh/nvm) a `.nvmrc` file is provided. To run this project you will need to install [pnpm](https://pnpm.io/) for dependencies and Typescript if you don't have it already.
```
npm install -g pnpm typescript
```
[Docker](https://www.docker.com/) is also used to run the backend.

Before initializing the backend, please got to `backend/` and **provide a `.env` file with the following contents**:
```env
POSTGRES_PORT=5432
POSTGRES_HOST=postgres
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
```

Setup your DB `name`, `user` and `password` as needed. Then to initialize the backend for development change directory to that folder, install dependencies and run the `dev.docker` script:
```
pnpm install
pnpm dev.docker
```

For the frontend, open another terminal and run the `dev` script after installing the dependencies:
```
cd frontend
pnpm install
pnpm dev
```

# Code Structure

This section contains a brief description of the tools used, folder structure and main files, with small observations for future improvements.

## Backend

### Tools
In this backend was used a NodeJS environment with Typescript, Express and a direct connection to a PostgreSQL database provided by the docker container. No ORM is being used at the moment because despite looking at some options I'm not familiar with any Javascript ORMs at the time being, so raw SQL is used instead.

### Folder structure
```
backend/              # root folder
    src/              # source code
        controllers/  # future improvement: remove business logic from index.ts
        models/       # database models
        index.ts      # main entry point
```

### Improvements
- Add a `src/controllers` folder and move logic dealing with tasks in `index.ts` to `tasksController.ts`
  - Add validation to input
- Add a `src/routes` folder if the amount of handled routes grows
- Use an ORM to access the database
- Add unit tests

## Frontend

### Tools
The Frontend uses Vite + ReactJS with Typescript

### Folder structure
```
frontend/             # root folder
    src/              # source code
        components/   # future improvement: decouple components by keeping styles and tests together
        hooks/        # reusable hooks
        reducers/     # future improvement: handle complex state logic more easily
        App.tsx       # Inital component with logic
        main.ts       # main entry point
```
### Improvements
- Move complex Task related state logic into a reducer with `useReducer`
- Move components to `src/components` folder, with one subfolder for each
  - Create a `Task` component for reusability and easier styling
  - Create a `TaskList` component to show tasks
- Fix TailwindCSS integration and improve styling
- Add unit tests
- Add integration tests